
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  Grid,
  Paper,
  Divider,
  IconButton
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
  onUpdateUser: (user: User) => void;
  onBack: () => void;
}

export default function ProfilePage({ user, onUpdateUser, onBack }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    onUpdateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ color: '#25D366' }}
        >
          Back to Dashboard
        </Button>
      </Box>

      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            background: 'linear-gradient(45deg, #25D366, #128C7E)',
            padding: 4,
            textAlign: 'center',
            color: 'white'
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              margin: '0 auto 2',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              fontSize: '3rem'
            }}
          >
            <PersonIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Manager Profile
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2">
              Profile Information
            </Typography>
            {!isEditing ? (
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={() => setIsEditing(true)}
                sx={{ color: '#25D366', borderColor: '#25D366' }}
              >
                Edit Profile
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  startIcon={<SaveIcon />}
                  variant="contained"
                  onClick={handleSave}
                  sx={{ backgroundColor: '#25D366', '&:hover': { backgroundColor: '#128C7E' } }}
                >
                  Save
                </Button>
                <Button
                  startIcon={<CancelIcon />}
                  variant="outlined"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                variant="outlined"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                disabled={!isEditing}
                variant="outlined"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                variant="outlined"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value="manager@helpdesk.com"
                disabled
                variant="outlined"
                sx={{ mb: 3 }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            System Statistics
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6} md={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">12</Typography>
                  <Typography variant="body2">Total Attendants</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">45</Typography>
                  <Typography variant="body2">Active Clients</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">3</Typography>
                  <Typography variant="body2">Bot Instances</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">128</Typography>
                  <Typography variant="body2">Total Chats</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </Container>
  );
}
