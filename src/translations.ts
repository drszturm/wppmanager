
export interface Translations {
  // App Bar
  appTitle: string;
  welcome: string;
  logout: string;
  
  // Tabs
  attendants: string;
  clients: string;
  bots: string;
  instances: string;
  chatHistory: string;
  
  // Contact Lists
  online: string;
  offline: string;
  connected: string;
  disconnected: string;
  
  // Dialog
  cancel: string;
  add: string;
  close: string;
  name: string;
  phoneNumber: string;
  instanceNumber: string;
  
  // Add Dialog Titles
  addNewAttendant: string;
  addNewClient: string;
  addNewBot: string;
  addNewInstance: string;
  
  // Chat
  clientChats: string;
  selectChat: string;
  
  // Profile
  userProfile: string;
  fullName: string;
  role: string;
  
  // Roles
  admin: string;
  attendant: string;
  supervisor: string;
  
  // WhatsApp Instances
  whatsappInstances: string;
  
  // Login
  loginTitle: string;
  loginSubtitle: string;
  loginButton: string;
  loginDescription: string;
  fillAllFields: string;
  validPhoneNumber: string;
  
  // Profile Page
  personalInformation: string;
  saveChanges: string;
  
  // Days of the week
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export const translations: Record<string, Translations> = {
  en: {
    // App Bar
    appTitle: "WhatsApp Helpdesk Manager",
    welcome: "Welcome",
    logout: "Logout",
    
    // Tabs
    attendants: "Attendants",
    clients: "Clients",
    bots: "Bots",
    instances: "Instances",
    chatHistory: "Chat History",
    
    // Contact Lists
    online: "online",
    offline: "offline",
    connected: "connected",
    disconnected: "disconnected",
    
    // Dialog
    cancel: "Cancel",
    add: "Add",
    close: "Close",
    name: "Name",
    phoneNumber: "Phone Number",
    instanceNumber: "Instance Number",
    
    // Add Dialog Titles
    addNewAttendant: "Add New Attendant",
    addNewClient: "Add New Client",
    addNewBot: "Add New Bot",
    addNewInstance: "Add New Instance",
    
    // Chat
    clientChats: "Client Chats",
    selectChat: "Select a chat to view history",
    
    // Profile
    userProfile: "User Profile",
    fullName: "Full Name",
    role: "Role",
    
    // Roles
    admin: "Administrator",
    attendant: "Attendant",
    supervisor: "Supervisor",
    
    // WhatsApp Instances
    whatsappInstances: "WhatsApp Instances",
    
    // Login
    loginTitle: "WhatsApp Helpdesk",
    loginSubtitle: "Manager Login",
    loginButton: "Login to Dashboard",
    loginDescription: "Manage your WhatsApp support team efficiently",
    fillAllFields: "Please fill in all fields",
    validPhoneNumber: "Please enter a valid phone number",
    
    // Profile Page
    personalInformation: "Personal Information",
    saveChanges: "Save Changes",
    
    // Days of the week
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday"
  },
  es: {
    // App Bar
    appTitle: "Gestor de Mesa de Ayuda WhatsApp",
    welcome: "Bienvenido",
    logout: "Cerrar Sesión",
    
    // Tabs
    attendants: "Agentes",
    clients: "Clientes",
    bots: "Bots",
    instances: "Instancias",
    chatHistory: "Historial de Chat",
    
    // Contact Lists
    online: "en línea",
    offline: "desconectado",
    connected: "conectado",
    disconnected: "desconectado",
    
    // Dialog
    cancel: "Cancelar",
    add: "Agregar",
    close: "Cerrar",
    name: "Nombre",
    phoneNumber: "Número de Teléfono",
    instanceNumber: "Número de Instancia",
    
    // Add Dialog Titles
    addNewAttendant: "Agregar Nuevo Agente",
    addNewClient: "Agregar Nuevo Cliente",
    addNewBot: "Agregar Nuevo Bot",
    addNewInstance: "Agregar Nueva Instancia",
    
    // Chat
    clientChats: "Chats de Clientes",
    selectChat: "Selecciona un chat para ver el historial",
    
    // Profile
    userProfile: "Perfil de Usuario",
    fullName: "Nombre Completo",
    role: "Rol",
    
    // Roles
    admin: "Administrador",
    attendant: "Agente",
    supervisor: "Supervisor",
    
    // WhatsApp Instances
    whatsappInstances: "Instancias de WhatsApp",
    
    // Login
    loginTitle: "Mesa de Ayuda WhatsApp",
    loginSubtitle: "Inicio de Sesión del Gestor",
    loginButton: "Iniciar Sesión en el Panel",
    loginDescription: "Gestiona tu equipo de soporte de WhatsApp eficientemente",
    fillAllFields: "Por favor completa todos los campos",
    validPhoneNumber: "Por favor ingresa un número de teléfono válido",
    
    // Profile Page
    personalInformation: "Información Personal",
    saveChanges: "Guardar Cambios",
    
    // Days of the week
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo"
  },
  pt: {
    // App Bar
    appTitle: "Gerenciador de Helpdesk WhatsApp",
    welcome: "Bem-vindo",
    logout: "Sair",
    
    // Tabs
    attendants: "Atendentes",
    clients: "Clientes",
    bots: "Bots",
    instances: "Instâncias",
    chatHistory: "Histórico de Chat",
    
    // Contact Lists
    online: "online",
    offline: "offline",
    connected: "conectado",
    disconnected: "desconectado",
    
    // Dialog
    cancel: "Cancelar",
    add: "Adicionar",
    close: "Fechar",
    name: "Nome",
    phoneNumber: "Número de Telefone",
    instanceNumber: "Número da Instância",
    
    // Add Dialog Titles
    addNewAttendant: "Adicionar Novo Atendente",
    addNewClient: "Adicionar Novo Cliente",
    addNewBot: "Adicionar Novo Bot",
    addNewInstance: "Adicionar Nova Instância",
    
    // Chat
    clientChats: "Chats de Clientes",
    selectChat: "Selecione um chat para ver o histórico",
    
    // Profile
    userProfile: "Perfil do Usuário",
    fullName: "Nome Completo",
    role: "Função",
    
    // Roles
    admin: "Administrador",
    attendant: "Atendente",
    supervisor: "Supervisor",
    
    // WhatsApp Instances
    whatsappInstances: "Instâncias do WhatsApp",
    
    // Login
    loginTitle: "Helpdesk WhatsApp",
    loginSubtitle: "Login do Gerenciador",
    loginButton: "Entrar no Painel",
    loginDescription: "Gerencie sua equipe de suporte WhatsApp eficientemente",
    fillAllFields: "Por favor preencha todos os campos",
    validPhoneNumber: "Por favor insira um número de telefone válido",
    
    // Profile Page
    personalInformation: "Informações Pessoais",
    saveChanges: "Salvar Alterações",
    
    // Days of the week
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
    sunday: "Domingo"
  }
};

export const getTranslation = (lang: string): Translations => {
  return translations[lang] || translations.en;
};
