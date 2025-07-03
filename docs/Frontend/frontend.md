---
id: frontend
title: Frontend
sidebar_position: 2
---

# Frontend Overview

Das RechtsUndSteuerKI Frontend implementiert eine moderne Single-Page Application (SPA) für Legal/Tax Practice Management mit Vue 3, TypeScript, Vuetify und umfassender AI Integration. Die Architektur folgt enterprise-grade patterns für Skalierbarkeit, Maintainability und Performance.

## Technology Stack & Architecture

### Core Framework Stack

**Vue 3 Ecosystem**:

```json
{
  "vue": "^3.5.13",
  "vue-router": "^4.5.0",
  "vuex": "^4.1.0",
  "typescript": "~5.8.0"
}
```

**UI Framework**:

```json
{
  "vuetify": "^3.8.3",
  "@mdi/font": "^7.4.47"
}
```

**Build & Development Tools**:

```json
{
  "vite": "^6.2.4",
  "@vitejs/plugin-vue": "^5.2.3",
  "vite-plugin-vue-devtools": "^7.7.2"
}
```

## Project Structure

```
frontend/
├── src/
│   ├── assets/          # Static assets (images, fonts)
│   ├── components/      # Reusable Vue components
│   ├── router/          # Application routes
│   ├── services/        # API clients and helpers
│   ├── store/           # Vuex store modules
│   ├── types/           # TypeScript interfaces
│   ├── views/           # Page level components
│   ├── App.vue          # Root component
│   └── main.ts          # Entry point
├── public/              # Public files served as-is
└── ...config files      # Vite and TypeScript configuration
```

### File Overview

| Path                                   | Purpose                                         |
| -------------------------------------- | ----------------------------------------------- |
| `index.html`                           | HTML entry used by Vite during development.     |
| `vite.config.ts`                       | Build and dev server configuration.             |
| `src/main.ts`                          | Bootstraps the Vue application.                 |
| `src/App.vue`                          | Root component containing the layout shell.     |
| `src/assets/`                          | Global styles and images.                       |
| `src/components/ClientList.vue`        | Lists existing clients.                         |
| `src/components/DocumentList.vue`      | Displays uploaded templates.                    |
| `src/components/DocumentPreview.vue`   | Shows document previews.                        |
| `src/components/DynamicMask.vue`       | Dynamically builds forms from placeholders.     |
| `src/components/Mask.vue`              | Base document mask component.                   |
| `src/components/WorkflowEditModal.vue` | Modal dialog for editing workflows.             |
| `src/router/index.ts`                  | Application routing definitions.                |
| `src/services/api.ts`                  | Axios instance and REST API helpers.            |
| `src/services/authService.ts`          | Authentication helper functions.                |
| `src/store/store.ts`                   | Vuex store initialization.                      |
| `src/store/modules/*`                  | Feature-specific Vuex modules.                  |
| `src/views/`                           | Page components mapped to routes.               |
| `src/views/AuthView.vue`               | Login form for user authentication.             |
| `src/views/DashboardView.vue`          | Overview dashboard listing workflows and stats. |
| `src/views/ClientCreationView.vue`     | Interface for adding and listing clients.       |
| `src/views/DocumentCreationView.vue`   | Upload and edit document templates.             |
| `src/views/DocumentFillingView.vue`    | Fill out a template for a specific client.      |
| `src/views/WorkflowDetailView.vue`     | Detailed view of a single workflow.             |
| `src/views/WorkflowDocumentsView.vue`  | View for managing uploaded documents.           |

## Core Application Features

### Document Management System

**Multi-Format Document Processing**:

```typescript
interface DocumentProcessor {
  supportedFormats: ["pdf", "docx", "doc"];
  previewModes: ["pdf", "text", "html"];
  processingCapabilities: {
    placeholderExtraction: boolean;
    templateGeneration: boolean;
    aiFieldExtraction: boolean;
    realTimePreview: boolean;
  };
}
```

**Document Processing Pipeline**:

1. **File Upload**: Drag & Drop interface mit MIME validation
2. **Format Detection**: Automatic file type recognition
3. **Placeholder Extraction**: AI-powered template variable detection
4. **Template Processing**: Real-time placeholder substitution
5. **Preview Generation**: Multi-format document preview
6. **Download/Export**: Generated document delivery

### AI-Powered Workflow Automation (in Progress)

**LLM Integration Architecture**:

```typescript
class AIAgentService {
  async processDocuments(files: File[], options: AIProcessingOptions) {
    return await api.post("/api/ai-agent/process", {
      files,
      tasks: [
        "client_extraction",
        "template_suggestion",
        "field_extraction",
        "document_classification",
      ],
      llm_config: {
        model: "llama3.2",
        temperature: 0.1,
        max_tokens: 2000,
      },
    });
  }
}
```

**AI Features Implementation**:

- **Client Recognition**: Automatic client identification från document content
- **Template Suggestions**: ML-based template matching
- **Field Extraction**: Intelligent data extraction från unstructured text
- **Document Classification**: Automatic document type determination
- **Quality Scoring**: Confidence metrics för AI-generated results

### State Management Architecture

**Vuex Store Modules**:

```typescript
// store/modules/workflow.ts
export default {
  namespaced: true,
  state: () => ({
    workflows: [] as Workflow[],
    activeWorkflow: null as Workflow | null,
    isLoading: false,
    filterCriteria: {
      status: null,
      priority: null,
      assignee: null,
    },
  }),
  getters: {
    getActiveWorkflows: (state) =>
      state.workflows.filter((w) => w.status !== "completed"),
    getWorkflowById: (state) => (id: number) =>
      state.workflows.find((w) => w.id === id),
    getFilteredWorkflows: (state, getters) => {
      // Complex filtering logic
    },
  },
  mutations: {
    SET_WORKFLOWS(state, workflows) {
      state.workflows = workflows;
    },
    UPDATE_WORKFLOW(state, workflow) {
      /* merge logic */
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async fetchWorkflows({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await WorkflowAPI.getWorkflows();
        commit("SET_WORKFLOWS", response.data);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
};
```

## Advanced UI Components

### Material Design Integration

**Vuetify Theme Configuration**:

```typescript
const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          brown: "#94754a", // Primary brand color
          darkBlue: "#0d1627", // Secondary brand color
          surface: "#ffffff",
          background: "#fafafa",
        },
      },
    },
  },
  display: {
    mobileBreakpoint: "sm",
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
```

**Component Design Patterns**:

```vue
<template>
  <v-card class="elevation-2 rounded-lg">
    <v-card-title class="d-flex align-center">
      <v-icon class="me-3" color="brown">{{ icon }}</v-icon>
      <span class="text-h6">{{ title }}</span>
      <v-spacer />
      <slot name="actions" />
    </v-card-title>

    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
```

## Performance Optimization Strategies

### Code Splitting & Lazy Loading

**Route-Based Splitting**:

```typescript
const routes = [
  {
    path: "/dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: {
      requiresAuth: true,
      preload: ["workflow", "user"],
    },
  },
  {
    path: "/documents/create",
    component: () => import("@/views/DocumentCreationView.vue"),
    meta: {
      requiresAuth: true,
      permission: "create_documents",
    },
  },
];
```

**Component Lazy Loading**:

```typescript
// Lazy component registration
const DocumentPreview = defineAsyncComponent(
  () => import("@/components/DocumentPreview.vue")
);
```

### API Communication Optimization

**Axios Configuration**:

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

## Development & Build Configuration

### Vite Build Configuration

**Production Optimization**:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  build: {
    target: "es2020",
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          "vue-vendor": ["vue", "vue-router", "vuex"],
          "ui-vendor": ["vuetify"],
          utils: ["axios", "lodash-es"],
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

### TypeScript Configuration

**Strict Type Safety**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

Das Frontend bietet enterprise-grade functionality für legal/tax practice management mit modern web technologies, comprehensive security measures und optimized performance für production deployment in professional environments.
