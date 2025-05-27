
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tab,
  Tabs,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Chip,
  Grid,
  Paper,
  Divider,
  Menu,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  SmartToy as BotIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
  Settings as SettingsIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import { getTranslation } from './translations';
import './App.css';

interface Contact {
  id: string;
  name: string;
  phone: string;
  status: 'online' | 'offline';
}

interface Chat {
  id: string;
  contactId: string;
  messages: Message[];
  lastMessage: string;
  timestamp: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'sent' | 'received';
}

interface Instance {
  id: string;
  name: string;
  number: string;
  status: 'connected' | 'disconnected';
}

interface User {
  name: string;
  role: string;
  phone: string;
}

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState('en');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [attendants, setAttendants] = useState<Contact[]>([
    { id: '1', name: 'John Doe', phone: '+1234567890', status: 'online' },
    { id: '2', name: 'Jane Smith', phone: '+1234567891', status: 'offline' }
  ]);
  const [clients, setClients] = useState<Contact[]>([
    { id: '1', name: 'Alice Johnson', phone: '+1234567892', status: 'online' },
    { id: '2', name: 'Bob Wilson', phone: '+1234567893', status: 'offline' }
  ]);
  const [bots, setBots] = useState<Contact[]>([
    { id: '1', name: 'Support Bot', phone: '+1234567894', status: 'online' }
  ]);
  const [instances, setInstances] = useState<Instance[]>([
    { id: '1', name: 'Main Instance', number: '+1234567895', status: 'connected' }
  ]);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      contactId: '1',
      messages: [
        { id: '1', sender: 'Alice Johnson', content: 'Hello, I need help', timestamp: '10:30 AM', type: 'received' },
        { id: '2', sender: 'John Doe', content: 'How can I assist you?', timestamp: '10:31 AM', type: 'sent' }
      ],
      lastMessage: 'How can I assist you?',
      timestamp: '10:31 AM'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'attendant' | 'client' | 'bot' | 'instance'>('attendant');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  const t = getTranslation(language);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setShowProfilePage(true);
  };

  const handleBackToMain = () => {
    setShowProfilePage(false);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name,
        phone: newContact.phone,
        status: 'offline'
      };

      switch (dialogType) {
        case 'attendant':
          setAttendants([...attendants, contact]);
          break;
        case 'client':
          setClients([...clients, contact]);
          break;
        case 'bot':
          setBots([...bots, contact]);
          break;
        case 'instance':
          setInstances([...instances, {
            id: Date.now().toString(),
            name: newContact.name,
            number: newContact.phone,
            status: 'disconnected'
          }]);
          break;
      }

      setNewContact({ name: '', phone: '' });
      setOpenDialog(false);
    }
  };

  const ContactList = ({ contacts, type, onDelete }: { contacts: Contact[], type: string, onDelete: (id: string) => void }) => (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {type} ({contacts.length})
        </Typography>
        <List>
          {contacts.map((contact) => (
            <ListItem key={contact.id} secondaryAction={
              <IconButton edge="end" onClick={() => onDelete(contact.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemAvatar>
                <Avatar>
                  {type === 'Bots' ? <BotIcon /> : <PersonIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={contact.phone}
              />
              <Chip
                label={contact.status === 'online' ? t.online : t.offline}
                color={contact.status === 'online' ? 'success' : 'default'}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const ChatHistory = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t.clientChats}
            </Typography>
            <List>
              {chats.map((chat) => {
                const client = clients.find(c => c.id === chat.contactId);
                return (
                  <ListItem
                    key={chat.id}
                    button
                    onClick={() => setSelectedChat(chat)}
                    selected={selectedChat?.id === chat.id}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <ChatIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={client?.name || 'Unknown Client'}
                      secondary={chat.lastMessage}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {chat.timestamp}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        {selectedChat ? (
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t.chatHistory}
              </Typography>
              <Paper variant="outlined" sx={{ height: 400, overflow: 'auto', p: 2 }}>
                {selectedChat.messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.type === 'sent' ? 'flex-end' : 'flex-start',
                      mb: 1
                    }}
                  >
                    <Paper
                      elevation={1}
                      sx={{
                        p: 1,
                        maxWidth: '70%',
                        backgroundColor: message.type === 'sent' ? 'primary.main' : 'grey.100',
                        color: message.type === 'sent' ? 'white' : 'text.primary'
                      }}
                    >
                      <Typography variant="body2">{message.content}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {message.timestamp}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Paper>
            </CardContent>
          </Card>
        ) : (
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" textAlign="center">
                {t.selectChat}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );

  if (!user) {
    return <LoginPage onLogin={handleLogin} language={language} onLanguageChange={setLanguage} />;
  }

  if (showProfilePage) {
    return (
      <ProfilePage
        user={user}
        onBack={handleBackToMain}
        onUpdateUser={handleUpdateUser}
        language={language}
        onLanguageChange={setLanguage}
      />
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#25D366' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="profile"
            onClick={handleProfileClick}
            sx={{ mr: 2 }}
          >
            <SettingsIcon />
          </IconButton>
          <PhoneIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t.appTitle}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                variant="outlined"
                sx={{ 
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}
              >
                <MenuItem value="en">🇺🇸 EN</MenuItem>
                <MenuItem value="es">🇪🇸 ES</MenuItem>
                <MenuItem value="pt">🇧🇷 PT</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2">
              {t.welcome}, {user.name} ({user.role === 'admin' ? t.admin : user.role === 'supervisor' ? t.supervisor : t.attendant})
            </Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                {t.logout}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} centered>
          <Tab label={t.attendants} />
          <Tab label={t.clients} />
          <Tab label={t.bots} />
          <Tab label={t.instances} />
          <Tab label={t.chatHistory} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <ContactList
            contacts={attendants}
            type={t.attendants}
            onDelete={(id) => setAttendants(attendants.filter(a => a.id !== id))}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <ContactList
            contacts={clients}
            type={t.clients}
            onDelete={(id) => setClients(clients.filter(c => c.id !== id))}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <ContactList
            contacts={bots}
            type={t.bots}
            onDelete={(id) => setBots(bots.filter(b => b.id !== id))}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t.whatsappInstances} ({instances.length})
              </Typography>
              <List>
                {instances.map((instance) => (
                  <ListItem key={instance.id} secondaryAction={
                    <IconButton edge="end" onClick={() => setInstances(instances.filter(i => i.id !== instance.id))}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                    <ListItemAvatar>
                      <Avatar>
                        <PhoneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={instance.name}
                      secondary={instance.number}
                    />
                    <Chip
                      label={instance.status === 'connected' ? t.connected : t.disconnected}
                      color={instance.status === 'connected' ? 'success' : 'error'}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <ChatHistory />
        </TabPanel>
      </Container>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16, backgroundColor: '#25D366' }}
        onClick={() => {
          const types: Array<'attendant' | 'client' | 'bot' | 'instance'> = ['attendant', 'client', 'bot', 'instance'];
          setDialogType(types[tabValue] || 'attendant');
          setOpenDialog(true);
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'attendant' && t.addNewAttendant}
          {dialogType === 'client' && t.addNewClient}
          {dialogType === 'bot' && t.addNewBot}
          {dialogType === 'instance' && t.addNewInstance}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t.name}
            fullWidth
            variant="outlined"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label={dialogType === 'instance' ? t.instanceNumber : t.phoneNumber}
            fullWidth
            variant="outlined"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{t.cancel}</Button>
          <Button onClick={handleAddContact} variant="contained">{t.add}</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showProfile} onClose={() => setShowProfile(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t.userProfile}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 80, height: 80, backgroundColor: '#25D366' }}>
                <PersonIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Box>
                <Typography variant="h6">{user?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.role === 'admin' ? t.admin : user?.role === 'supervisor' ? t.supervisor : t.attendant}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <TextField
              label={t.fullName}
              value={user?.name || ''}
              variant="outlined"
              disabled
              fullWidth
            />
            <TextField
              label={t.phoneNumber}
              value={user?.phone || ''}
              variant="outlined"
              disabled
              fullWidth
            />
            <TextField
              label={t.role}
              value={user?.role === 'admin' ? t.admin : user?.role === 'supervisor' ? t.supervisor : t.attendant}
              variant="outlined"
              disabled
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowProfile(false)}>{t.close}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
