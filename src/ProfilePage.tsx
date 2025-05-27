
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Avatar,
  TextField,
  Button,
  Divider,
  Grid,
  Paper,
  IconButton,
  Chip
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

interface User {
  name: string;
  role: string;
  phone: string;
}

interface ProfilePageProps {
  user: User;
  onBack: () => void;
  onUpdateUser: (user: User) => void;
}

export default function ProfilePage({ user, onBack, onUpdateUser }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    phone: user.phone,
    role: user.role
  });

  const handleSave = () => {
    onUpdateUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      phone: user.phone,
      role: user.role
    });
    setIsEditing(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          padding: 3,
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton
              onClick={onBack}
              sx={{ color: 'white', mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1" fontWeight="bold">
              User Profile
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: -2, pb: 4 }}>
        <Card elevation={8} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  backgroundColor: '#25D366',
                  mr: 3
                }}
              >
                <PersonIcon sx={{ fontSize: 60 }} />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {user.name}
                </Typography>
                <Chip
                  label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  color="primary"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body1" color="text.secondary">
                  WhatsApp Helpdesk Manager
                </Typography>
              </Box>
              <IconButton
                onClick={() => setIsEditing(!isEditing)}
                color="primary"
                size="large"
              >
                <EditIcon />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Personal Information
                  </Typography>
                  
                  {isEditing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <TextField
                        label="Full Name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        label="Phone Number"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        label="Role"
                        value={editForm.role}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="admin">Administrator</option>
                        <option value="attendant">Attendant</option>
                        <option value="supervisor">Supervisor</option>
                      </TextField>
                      
                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={handleSave}
                          sx={{ backgroundColor: '#25D366' }}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Full Name
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {user.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Phone Number
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {user.phone}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Role
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Account Statistics
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Account Status
                      </Typography>
                      <Chip label="Active" color="success" size="small" />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Last Login
                      </Typography>
                      <Typography variant="body2">
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Session Duration
                      </Typography>
                      <Typography variant="body2">
                        Active
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mt: 3 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => setIsEditing(true)}
                      disabled={isEditing}
                    >
                      Edit Profile
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Change Password
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Download Data
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
