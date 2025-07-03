---
id: api_communication
title: API Communication
sidebar_position: 4
---

# API Communication

Das Frontend implementiert eine service-basierte Architektur für API Communication, Authentication und Business Logic Abstraction.

## API Service Layer

### Core Axios Configuration

**Base API Setup**:

```typescript
const api = axios.create({
  baseURL: "", // Vite proxy handles routing
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor für authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor für error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await store.dispatch("user/logout");
      router.push("/auth");
    }
    return Promise.reject(error);
  }
);
```

### DocumentAPI Service

**Document Management Operations**:

```typescript
export const DocumentAPI = {
  // Template management
  getTemplates: () => api.get("/api/documents/templates"),
  getDocumentById: (id: number) => api.get(`/api/documents/${id}`),

  // File operations
  uploadDocument: (file: File, name: string, description: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    return api.post("/api/documents/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Preview & generation
  getTemporaryPreview: (file: File, placeholderValues: Record<string, any>) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("placeholders", JSON.stringify(placeholderValues));
    return api.post("/api/documents/preview-temp", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Document download
  downloadDocument: (
    documentId: number,
    placeholderValues: Record<string, any>
  ) => {
    return api.post(
      `/api/documents/download/${documentId}`,
      placeholderValues,
      {
        responseType: "blob",
      }
    );
  },
};
```

### ClientAPI Service

**Client Management Operations**:

```typescript
export const ClientAPI = {
  getClients: () => api.get("/api/clients"),
  getClient: (clientId: number) => api.get(`/api/clients/${clientId}`),
  createClient: (clientData: Record<string, any>) =>
    api.post("/api/clients", clientData),
  updateClient: (clientId: number, clientData: Record<string, any>) =>
    api.put(`/api/clients/${clientId}`, clientData),
  deleteClient: (clientId: number) => api.delete(`/api/clients/${clientId}`),
  searchClients: (query: string) =>
    api.get(`/api/clients/search?q=${encodeURIComponent(query)}`),
};
```

### WorkflowAPI Service

**Workflow Operations**:

```typescript
export const WorkflowAPI = {
  getWorkflows: () => api.get("/api/workflows"),
  getWorkflow: (workflowId: number) => api.get(`/api/workflows/${workflowId}`),
  createWorkflow: (workflowData: Record<string, any>) =>
    api.post("/api/workflows", workflowData),
  updateWorkflow: (workflowId: number, workflowData: Record<string, any>) =>
    api.put(`/api/workflows/${workflowId}`, workflowData),
  deleteWorkflow: (workflowId: number) =>
    api.delete(`/api/workflows/${workflowId}`),

  // Template application
  applyTemplate: (data: {
    workflowId: number;
    templateId: number;
    data: Record<string, any>;
    options: Record<string, any>;
  }) => api.post("/api/workflows/apply-template", data),
};
```

### AIAgentAPI Service

**AI Processing Operations**:

```typescript
export const AIAgentAPI = {
  processDocuments: (data: {
    files: File[];
    tasks: string[];
    options: Record<string, any>;
  }) => {
    const formData = new FormData();
    data.files.forEach((file) => formData.append("files", file));
    formData.append("tasks", JSON.stringify(data.tasks));
    formData.append("options", JSON.stringify(data.options));
    return api.post("/api/ai-agent/process", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  generateDocumentsSummary: (data: {
    documents: { id: number; name: string; content: string }[];
    options: Record<string, any>;
  }) => api.post("/api/ai-agent/summarize", data),

  extractFields: (data: {
    documents: Document[];
    template_id: number;
    extraction_config: Record<string, any>;
  }) => api.post("/api/ai-agent/extract-fields", data),
};
```

## Authentication Service

### AuthService Implementation

**Token Management**:

```typescript
class AuthService {
  async login(credentials: LoginCredentials) {
    const response = await api.post("/api/auth/login", credentials);
    const { token, user } = response.data;

    localStorage.setItem("auth_token", token);
    store.commit("user/SET_USER", user);

    return user;
  }

  async logout() {
    try {
      await api.post("/api/auth/logout");
    } finally {
      localStorage.removeItem("auth_token");
      store.commit("user/CLEAR_USER");
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await api.post("/api/auth/refresh", { refreshToken });
    localStorage.setItem("auth_token", response.data.token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("auth_token");
    return !!token && !this.isTokenExpired(token);
  }
}
```

## Error Handling Strategies

### Global Error Management

**Centralized Error Processing**:

```typescript
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle blob error responses
    if (
      error.config.responseType === "blob" &&
      error.response.data instanceof Blob
    ) {
      try {
        const text = await error.response.data.text();
        const errorData = JSON.parse(text);
        error.response.data = errorData;
      } catch (parseError) {
        console.error("Failed to parse blob error:", parseError);
      }
    }

    // Log all errors
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);
```

### Request Optimization

**Caching & Debouncing**:

```typescript
// Request caching
const requestCache = new Map<string, Promise<any>>();

const getCachedRequest = (url: string) => {
  if (!requestCache.has(url)) {
    requestCache.set(url, api.get(url));
    // Clear cache after 5 minutes
    setTimeout(() => requestCache.delete(url), 5 * 60 * 1000);
  }
  return requestCache.get(url);
};

// Debounced search
import { debounce } from "lodash-es";

const debouncedSearch = debounce(async (query: string) => {
  if (query.length < 2) return [];
  const results = await ClientAPI.searchClients(query);
  return results.data;
}, 300);
```

Die Services bieten comprehensive API abstraction mit robust error handling, authentication management und performance optimization für enterprise-grade applications.
