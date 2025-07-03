---
id: vuex_store
title: Vuex Store
sidebar_position: 3
---

# Vuex Store

Das Frontend implementiert ein modulares Vuex Store System für centralized state management mit TypeScript support und reactive data flow.

## Store Architecture

### Main Store Configuration

**Store Setup**:

```typescript
import { createStore } from "vuex";
import user from "./modules/user";
import workflow from "./modules/workflow";
import document from "./modules/document";
import client from "./modules/client";

export const store = createStore({
  modules: {
    user,
    client,
    workflow,
    document,
  },
  strict: process.env.NODE_ENV !== "production",
});
```

## User Module

### User State Management

**State Definition**:

```typescript
// store/modules/user.ts
export default {
  namespaced: true,
  state: () => ({
    currentUser: null as User | null,
    isAuthenticated: false,
    permissions: [] as string[],
    preferences: {} as UserPreferences,
  }),

  getters: {
    isAuthenticated: (state) => !!state.currentUser,
    hasPermission: (state) => (permission: string) =>
      state.permissions.includes(permission),
    getCurrentUser: (state) => state.currentUser,
    getUserPreferences: (state) => state.preferences,
  },

  mutations: {
    SET_USER(state, user: User) {
      state.currentUser = user;
      state.isAuthenticated = true;
      state.permissions = user.permissions || [];
    },

    CLEAR_USER(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.permissions = [];
    },

    UPDATE_PREFERENCES(state, preferences: UserPreferences) {
      state.preferences = { ...state.preferences, ...preferences };
    },
  },

  actions: {
    async login({ commit }, credentials: LoginCredentials) {
      const user = await AuthService.login(credentials);
      commit("SET_USER", user);
      return user;
    },

    async logout({ commit }) {
      await AuthService.logout();
      commit("CLEAR_USER");
    },
  },
};
```

## Workflow Module

### Workflow State Management

**Complex State Operations**:

```typescript
// store/modules/workflow.ts
export default {
  namespaced: true,
  state: () => ({
    workflows: [] as Workflow[],
    activeWorkflow: null as Workflow | null,
    isLoading: false,
    filterCriteria: {
      status: null as string | null,
      priority: null as string | null,
      assignee: null as string | null,
    },
    totalCount: 0,
    currentPage: 1,
  }),

  getters: {
    getActiveWorkflows: (state) =>
      state.workflows.filter(
        (w) => w.status !== "completed" && w.status !== "archived"
      ),

    getWorkflowById: (state) => (id: number) =>
      state.workflows.find((w) => w.id === id),

    getFilteredWorkflows: (state) => {
      let filtered = state.workflows;

      if (state.filterCriteria.status) {
        filtered = filtered.filter(
          (w) => w.status === state.filterCriteria.status
        );
      }

      if (state.filterCriteria.priority) {
        filtered = filtered.filter(
          (w) => w.priority === state.filterCriteria.priority
        );
      }

      return filtered;
    },

    getWorkflowsByClient: (state) => (clientId: number) =>
      state.workflows.filter((w) => w.client_id === clientId),
  },

  mutations: {
    SET_WORKFLOWS(state, workflows: Workflow[]) {
      state.workflows = workflows;
    },

    ADD_WORKFLOW(state, workflow: Workflow) {
      state.workflows.unshift(workflow);
    },

    UPDATE_WORKFLOW(state, updatedWorkflow: Workflow) {
      const index = state.workflows.findIndex(
        (w) => w.id === updatedWorkflow.id
      );
      if (index !== -1) {
        state.workflows.splice(index, 1, updatedWorkflow);
      }
    },

    REMOVE_WORKFLOW(state, workflowId: number) {
      state.workflows = state.workflows.filter((w) => w.id !== workflowId);
    },

    SET_ACTIVE_WORKFLOW(state, workflow: Workflow) {
      state.activeWorkflow = workflow;
    },

    SET_FILTER_CRITERIA(state, criteria: Partial<FilterCriteria>) {
      state.filterCriteria = { ...state.filterCriteria, ...criteria };
    },

    SET_LOADING(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
  },

  actions: {
    async fetchWorkflows({ commit, state }) {
      commit("SET_LOADING", true);
      try {
        const response = await WorkflowAPI.getWorkflows({
          page: state.currentPage,
          filters: state.filterCriteria,
        });
        commit("SET_WORKFLOWS", response.data.workflows);
        commit("SET_TOTAL_COUNT", response.data.total);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createWorkflow({ commit }, workflowData: WorkflowCreateData) {
      const response = await WorkflowAPI.createWorkflow(workflowData);
      commit("ADD_WORKFLOW", response.data);
      return response.data;
    },

    async updateWorkflow(
      { commit },
      { id, data }: { id: number; data: WorkflowUpdateData }
    ) {
      const response = await WorkflowAPI.updateWorkflow(id, data);
      commit("UPDATE_WORKFLOW", response.data);
      return response.data;
    },

    async deleteWorkflow({ commit }, workflowId: number) {
      await WorkflowAPI.deleteWorkflow(workflowId);
      commit("REMOVE_WORKFLOW", workflowId);
    },
  },
};
```

## Document Module

### Document State Management

**Template & Document Operations**:

```typescript
// store/modules/document.ts
export default {
  namespaced: true,
  state: () => ({
    templates: [] as DocumentTemplate[],
    documents: [] as Document[],
    currentDocument: null as Document | null,
    isUploading: false,
    uploadProgress: 0,
  }),

  getters: {
    getTemplates: (state) => state.templates,
    getTemplateById: (state) => (id: number) =>
      state.templates.find((t) => t.id === id),
    getDocumentsByWorkflow: (state) => (workflowId: number) =>
      state.documents.filter((d) => d.workflow_id === workflowId),
  },

  mutations: {
    SET_TEMPLATES(state, templates: DocumentTemplate[]) {
      state.templates = templates;
    },

    ADD_TEMPLATE(state, template: DocumentTemplate) {
      state.templates.push(template);
    },

    UPDATE_TEMPLATE(state, updatedTemplate: DocumentTemplate) {
      const index = state.templates.findIndex(
        (t) => t.id === updatedTemplate.id
      );
      if (index !== -1) {
        state.templates.splice(index, 1, updatedTemplate);
      }
    },

    SET_UPLOAD_PROGRESS(state, progress: number) {
      state.uploadProgress = progress;
    },

    SET_UPLOADING(state, isUploading: boolean) {
      state.isUploading = isUploading;
    },
  },

  actions: {
    async fetchTemplates({ commit }) {
      const response = await DocumentAPI.getTemplates();
      commit("SET_TEMPLATES", response.data);
    },

    async uploadTemplate(
      { commit },
      { file, name, description, placeholders }
    ) {
      commit("SET_UPLOADING", true);
      try {
        const response = await DocumentAPI.saveTemplate(
          file,
          name,
          description,
          placeholders
        );
        commit("ADD_TEMPLATE", response.data);
        return response.data;
      } finally {
        commit("SET_UPLOADING", false);
        commit("SET_UPLOAD_PROGRESS", 0);
      }
    },
  },
};
```

## Client Module

### Client Data Management

**Client CRUD Operations**:

```typescript
// store/modules/client.ts
export default {
  namespaced: true,
  state: () => ({
    clients: [] as Client[],
    isLoading: false,
    searchResults: [] as Client[],
    totalCount: 0,
    currentPage: 1,
    filters: {
      clientType: null as "natural" | "company" | null,
      legalForm: null as string | null,
      location: null as string | null,
    },
  }),

  getters: {
    getAllClients: (state) => state.clients,
    getClientById: (state) => (id: number) =>
      state.clients.find((c) => c.id === id),
    getNaturalPersons: (state) =>
      state.clients.filter((c) => c.client_type === "natural"),
    getCompanies: (state) =>
      state.clients.filter((c) => c.client_type === "company"),
    isLoading: (state) => state.isLoading,
    getTotalCount: (state) => state.totalCount,
  },

  mutations: {
    SET_CLIENTS(state, clients: Client[]) {
      state.clients = clients;
    },

    APPEND_CLIENTS(state, clients: Client[]) {
      state.clients.push(...clients);
    },

    ADD_CLIENT(state, client: Client) {
      state.clients.unshift(client);
    },

    UPDATE_CLIENT(state, updatedClient: Client) {
      const index = state.clients.findIndex((c) => c.id === updatedClient.id);
      if (index !== -1) {
        state.clients.splice(index, 1, updatedClient);
      }
    },

    REMOVE_CLIENT(state, clientId: number) {
      state.clients = state.clients.filter((c) => c.id !== clientId);
    },

    SET_LOADING(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },

    SET_SEARCH_RESULTS(state, results: Client[]) {
      state.searchResults = results;
    },
  },

  actions: {
    async fetchClients({ commit, state }) {
      commit("SET_LOADING", true);
      try {
        const response = await ClientAPI.getClients({
          page: state.currentPage,
          filters: state.filters,
        });

        if (state.currentPage === 1) {
          commit("SET_CLIENTS", response.data.clients);
        } else {
          commit("APPEND_CLIENTS", response.data.clients);
        }

        commit("SET_TOTAL_COUNT", response.data.total);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createClient({ commit }, clientData: ClientCreateData) {
      const response = await ClientAPI.createClient(clientData);
      commit("ADD_CLIENT", response.data);
      return response.data;
    },

    async searchClients({ commit }, query: string) {
      const response = await ClientAPI.searchClients(query);
      commit("SET_SEARCH_RESULTS", response.data.results);
      return response.data.results;
    },
  },
};
```

## TypeScript Integration

### Store Type Safety

**Typed Store Access**:

```typescript
// types/vuex.d.ts
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<RootState>;
  }
}

export interface RootState {
  user: UserState;
  workflow: WorkflowState;
  document: DocumentState;
  client: ClientState;
}
```

Das Store System bietet comprehensive state management mit modular architecture, type safety und optimized performance für complex application state scenarios.
