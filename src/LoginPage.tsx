
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Avatar
} from '@mui/material';
import { Phone as PhoneIcon, Login as LoginIcon } from '@mui/icons-material';

interface LoginPageProps {
  onLogin: (user: { name: string; role: string; phone: string }) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'attendant'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    onLogin({
      name: formData.name,
      role: formData.role,
      phone: formData.phone
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            backgroundColor: 'white'
          }}
        >
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
                width: 80,
                height: 80,
                margin: '0 auto 2',
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <PhoneIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              WhatsApp Helpdesk
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Manager Dashboard
            </Typography>
          </Box>

          <CardContent sx={{ padding: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              textAlign="center"
              color="text.primary"
              fontWeight="600"
              sx={{ mb: 3 }}
            >
              Login to Continue
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                margin="normal"
                required
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                margin="normal"
                required
                placeholder="+1234567890"
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formData.role}
                  label="Role"
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <MenuItem value="admin">Administrator</MenuItem>
                  <MenuItem value="attendant">Attendant</MenuItem>
                  <MenuItem value="supervisor">Supervisor</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                startIcon={<LoginIcon />}
                sx={{
                  mt: 2,
                  py: 2,
                  backgroundColor: '#25D366',
                  '&:hover': {
                    backgroundColor: '#128C7E'
                  },
                  fontSize: '1.1rem',
                  fontWeight: 600
                }}
              >
                Login to Dashboard
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Manage your WhatsApp support team efficiently
              </Typography>
            </Box>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
}
