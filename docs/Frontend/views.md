---
id: views
title: Views
sidebar_position: 2
---

# Views

Das Vue 3 Frontend implementiert eine umfassende Single-Page Application (SPA) mit typisierten Views für Legal/Tax Practice Management. Alle Views nutzen Vue 3 Composition API mit TypeScript, Vuetify Material Design Components und reaktive State Management über Vuex.

## Technical Architecture

**Vue Router Integration**:

```typescript
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: DashboardView, name: "dashboard" },
    { path: "/auth", component: AuthView, name: "auth" },
    {
      path: "/clients/create",
      component: ClientCreationView,
      name: "client-creation",
    },
    {
      path: "/documents/create",
      component: DocumentCreationView,
      name: "document-creation",
    },
    {
      path: "/workflows/:id",
      component: WorkflowDetailView,
      name: "workflow-detail",
    },
    { path: "/ai-agent", component: AIAgentView, name: "ai-agent" },
  ],
});
```

## Main Application Views

### DashboardView.vue - Central Workflow Management Hub

**Component Architecture**:

```typescript
export default defineComponent({
  name: "DashboardView",
  setup() {
    const store = useStore();
    const workflows = computed(
      () => store.getters["workflow/getActiveWorkflows"]
    );
    const statusFilter = ref<string | null>(null);
    const priorityFilter = ref<string | null>(null);

    // Reactive filtering system
    const filteredWorkflows = computed(() => {
      return workflows.value.filter(
        (workflow) =>
          (!statusFilter.value || workflow.status === statusFilter.value) &&
          (!priorityFilter.value || workflow.priority === priorityFilter.value)
      );
    });
  },
});
```

**Key Features**:

- **Workflow Grid Display**: Responsive card-based layout mit Material Design
- **Advanced Filtering**: Multi-criteria filtering nach Status, Priority, Client
- **Real-time Updates**: WebSocket integration für live workflow status updates
- **Quick Actions**: Instant workflow creation und AI Agent access
- **Performance Optimized**: Virtual scrolling für large workflow collections

**Vuetify Integration**:

```vue
<v-container fluid class="dashboard-container">
    <v-card class="workflows-card" elevation="0">
        <v-card-text class="filters-section">
            <v-row align="center">
                <v-col cols="auto">
                    <v-select
                        v-model="statusFilter"
                        :items="statusItems"
                        label="Status Filter"
                        variant="outlined"
                        clearable
                    />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</v-container>
```

### DocumentCreationView.vue - Advanced Document Template Editor

**Complex Form Management**:

```typescript
const formData = reactive({
  name: "",
  description: "",
  category: "",
  placeholders: [] as Placeholder[],
  file: null as File | null,
});

const placeholderManager = ref<PlaceholderManager>();
const documentPreview = ref<DocumentPreview>();

// Dynamic placeholder detection
const extractPlaceholders = async (file: File) => {
  const response = await DocumentAPI.extractPlaceholders(file);
  formData.placeholders = response.data.placeholders;
};
```

**Technical Features**:

- **File Upload**: Drag & Drop interface mit MIME type validation
- **Placeholder Extraction**: Automatic detection von template variables
- **Live Preview**: Real-time document preview mit placeholder substitution
- **Template Validation**: Comprehensive validation rules für document templates
- **Type Safety**: Full TypeScript integration für placeholder definitions

### ClientCreationView.vue - Polymorphic Client Forms

**Dynamic Form Rendering**:

```typescript
const clientType = ref<"natural" | "company">("natural");
const formFields = computed(() => {
  return clientType.value === "natural" ? naturalPersonFields : companyFields;
});

const validationRules = computed(() => {
  return getValidationRulesForType(clientType.value);
});
```

**Features**:

- **Polymorphic Forms**: Different form layouts für natural persons vs companies
- **Address Validation**: Integration mit address validation APIs
- **Tax ID Validation**: Real-time validation für German tax identifiers
- **Auto-completion**: Smart suggestions für commonly used data

### WorkflowDetailView.vue - Comprehensive Workflow Management

**Multi-Component Integration**:

```typescript
const workflowId = computed(() => parseInt(route.params.id as string));
const workflow = computed(() =>
  store.getters["workflow/getWorkflowById"](workflowId.value)
);

const activeTab = ref("documents");
const tabs = [
  { key: "documents", label: "Dokumente", component: WorkflowDocumentsView },
  { key: "timeline", label: "Timeline", component: WorkflowTimelineView },
  { key: "comments", label: "Kommentare", component: WorkflowCommentsView },
];
```

**Advanced Features**:

- **Tabbed Interface**: Multi-view workflow management
- **Document Management**: Integrated document upload, processing, and preview
- **Timeline Tracking**: Complete audit trail für workflow changes
- **Collaboration Tools**: Comments, assignments, notifications
- **Status Management**: Workflow state transitions mit validation

### AIAgentView.vue - AI-Powered Document Processing (in Progress)

**LLM Integration**:

```typescript
const aiProcessing = reactive({
  isActive: false,
  currentTask: null as AITask | null,
  progress: 0,
  results: [] as AIResult[],
});

const processDocuments = async (files: File[]) => {
  aiProcessing.isActive = true;

  try {
    const response = await AIAgentAPI.processDocuments({
      files,
      tasks: ["extract_client", "suggest_template", "extract_fields"],
      options: { confidence_threshold: 0.8 },
    });

    aiProcessing.results = response.data.results;
  } catch (error) {
    handleAIError(error);
  }
};
```

**AI Features**:

- **Multi-Document Processing**: Batch processing von document uploads
- **Client Recognition**: Automatic client identification från document content
- **Template Suggestion**: ML-based template recommendations
- **Field Extraction**: Intelligent data extraction från unstructured documents
- **Confidence Scoring**: ML confidence metrics für extracted data

### IntelligentDocumentProcessingView.vue - Enterprise Document Pipeline

**ETL Pipeline Management**:

```typescript
const processingPipeline = reactive({
  stages: [
    { id: "upload", status: "pending", progress: 0 },
    { id: "analysis", status: "pending", progress: 0 },
    { id: "extraction", status: "pending", progress: 0 },
    { id: "validation", status: "pending", progress: 0 },
  ],
  currentStage: 0,
  totalProgress: 0,
});

const advanceStage = (stageId: string, progress: number) => {
  const stage = processingPipeline.stages.find((s) => s.id === stageId);
  if (stage) {
    stage.progress = progress;
    stage.status = progress === 100 ? "completed" : "processing";
  }
  updateTotalProgress();
};
```

**Enterprise Features**:

- **Processing Pipeline**: Multi-stage document processing workflow
- **Batch Operations**: Large-scale document processing capabilities
- **Quality Control**: Validation stages für processed documents
- **Error Handling**: Comprehensive error recovery mechanisms
- **Progress Tracking**: Real-time progress updates für long-running operations

### DocumentFillingView.vue - Interactive Form Completion

**Dynamic Form Interaction**:

```typescript
const documentTemplate = ref<DocumentTemplate>();
const fieldValues = reactive<Record<string, any>>({});
const validationErrors = reactive<Record<string, string[]>>({});

// AI-powered auto-fill
const autoFillFields = async () => {
  if (!documentContext.value) return;

  const response = await LLMService.extractFields({
    context: documentContext.value,
    placeholders: documentTemplate.value?.placeholders || [],
  });

  Object.assign(fieldValues, response.data.extracted_values);
};
```

**Interactive Features**:

- **Dynamic Forms**: Real-time form generation från template definitions
- **Auto-Fill Integration**: AI-powered field population
- **Live Preview**: Instant document preview während data entry
- **Validation Pipeline**: Multi-level validation för form data
- **Save/Resume**: Session persistence för incomplete forms

### AccountSettingsView.vue - User Profile Management

**User Settings Management**:

```typescript
const userSettings = reactive({
  profile: { name: "", email: "", preferences: {} },
  security: { currentPassword: "", newPassword: "" },
  notifications: { email: true, browser: true, workflow: true },
});

const updateProfile = async () => {
  await UserAPI.updateProfile(userSettings.profile);
  store.commit("user/UPDATE_PROFILE", userSettings.profile);
};
```

**Settings Features**:

- **Profile Management**: Personal information & preferences
- **Security Settings**: Password changes & 2FA setup
- **Notification Settings**: Communication preferences
- **System Preferences**: UI customization & language settings

### ClientCreationView.vue - Client Management Interface

**Client Data Management**:

```typescript
const clientForm = reactive({
  type: "natural" as "natural" | "company",
  personal: { firstName: "", lastName: "", dateOfBirth: "" },
  company: { name: "", legalForm: "", registrationNumber: "" },
  contact: { email: "", phone: "", address: {} },
});

const validateClient = () => {
  const errors = [];
  if (clientForm.type === "natural" && !clientForm.personal.firstName) {
    errors.push("Vorname ist erforderlich");
  }
  return errors;
};
```

**Client Features**:

- **Dual Client Types**: Natural persons & companies
- **Contact Management**: Comprehensive contact information
- **Address Integration**: Structured address data
- **Validation System**: Client-type specific validation

### DashboardBacklogView.vue - Advanced Workflow Dashboard

**Complex Dashboard Interface** (2640 lines - largest component):

```typescript
const dashboardData = reactive({
  workflows: [] as Workflow[],
  metrics: { total: 0, active: 0, completed: 0, overdue: 0 },
  filters: { status: null, priority: null, assignee: null, dateRange: null },
  sorting: { field: "created_at", direction: "desc" },
  pagination: { current: 1, size: 20, total: 0 },
});

const refreshDashboard = async () => {
  const [workflowsResponse, metricsResponse] = await Promise.all([
    WorkflowAPI.getWorkflows(dashboardData.filters),
    AnalyticsAPI.getWorkflowMetrics(),
  ]);

  dashboardData.workflows = workflowsResponse.data;
  dashboardData.metrics = metricsResponse.data;
};
```

**Advanced Dashboard Features**:

- **Real-time Metrics**: Live workflow statistics & KPIs
- **Advanced Filtering**: Multi-criteria workflow filtering
- **Batch Operations**: Mass workflow operations
- **Performance Analytics**: Workflow performance insights
- **Custom Views**: Personalized dashboard layouts

## Performance & Optimization Strategies

### Lazy Loading Implementation

**Route-Based Code Splitting**:

```typescript
const routes = [
  {
    path: "/dashboard",
    component: () => import("./views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/documents/create",
    component: () => import("./views/DocumentCreationView.vue"),
    meta: { requiresAuth: true, permission: "create_documents" },
  },
];
```

### State Management Optimization

**Vuex Module Federation**:

```typescript
const store = createStore({
  modules: {
    user: {
      namespaced: true,
      state: () => ({ currentUser: null }),
      getters: { isAuthenticated: (state) => !!state.currentUser },
    },
    workflow: {
      namespaced: true,
      state: () => ({ workflows: [], activeWorkflow: null }),
      actions: {
        async fetchWorkflows({ commit }) {
          /* ... */
        },
      },
    },
  },
});
```

Die Views implementieren comprehensive business logic für legal/tax practice management mit modern Vue 3 patterns, enterprise-grade error handling und optimized performance für production deployment.
