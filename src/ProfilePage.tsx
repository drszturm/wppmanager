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
  IconButton,
  Divider,
  Paper,
  AppBar,
  Toolbar,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Grid,
  Stack,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  Person as PersonIcon, 
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Language as LanguageIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { getTranslation } from './translations';

interface ProfilePageProps {
  user: {
    name: string;
    role: string;
    phone: string;
  };
  onBack: () => void;
  onUpdateUser: (user: { name: string; role: string; phone: string }) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

interface Schedule {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface WeeklySchedule {
  monday: Schedule;
  tuesday: Schedule;
  wednesday: Schedule;
  thursday: Schedule;
  friday: Schedule;
  saturday: Schedule;
  sunday: Schedule;
}

const initialSchedule: WeeklySchedule = {
  monday: { enabled: false, startTime: '09:00', endTime: '17:00' },
  tuesday: { enabled: false, startTime: '09:00', endTime: '17:00' },
  wednesday: { enabled: false, startTime: '09:00', endTime: '17:00' },
  thursday: { enabled: false, startTime: '09:00', endTime: '17:00' },
  friday: { enabled: false, startTime: '09:00', endTime: '17:00' },
  saturday: { enabled: false, startTime: '09:00', endTime: '17:00' },
  sunday: { enabled: false, startTime: '09:00', endTime: '17:00' }
};

const getDayName = (day: string) => {
  switch (day) {
    case 'monday': return 'Monday';
    case 'tuesday': return 'Tuesday';
    case 'wednesday': return 'Wednesday';
    case 'thursday': return 'Thursday';
    case 'friday': return 'Friday';
    case 'saturday': return 'Saturday';
    case 'sunday': return 'Sunday';
    default: return day;
  }
};

export default function ProfilePage({ user, onBack, onUpdateUser, language, onLanguageChange }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    phone: user.phone,
    role: user.role
  });

  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule>(initialSchedule);
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);

  const t = getTranslation(language);

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

  const handleScheduleChange = (day: keyof WeeklySchedule, field: string, value: any) => {
    setWeeklySchedule(prevSchedule => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [field]: value
      }
    }));
  };

  const handleSaveSchedule = () => {
    // Here, you would typically send the updated weeklySchedule to your backend.
    setIsEditingSchedule(false);
    console.log('Saving schedule:', weeklySchedule);
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
              {t.userProfile}
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
              <Grid xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    {t.personalInformation || 'Personal Information'}
                  </Typography>

                  {isEditing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <TextField
                        label={t.fullName}
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        label={t.phoneNumber}
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        label={t.role}
                        value={editForm.role}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        variant="outlined"
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                      >
                        <option value="admin">{t.admin}</option>
                        <option value="attendant">{t.attendant}</option>
                        <option value="supervisor">{t.supervisor}</option>
                      </TextField>

                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={handleSave}
                          sx={{ backgroundColor: '#25D366' }}
                        >
                          {t.saveChanges || 'Save Changes'}
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={handleCancel}
                        >
                          {t.cancel}
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {t.fullName}
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {user.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {t.phoneNumber}
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {user.phone}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {t.role}
                        </Typography>
                        <Typography variant="body1" fontWeight="500">
                          {user.role === 'admin' ? t.admin : user.role === 'supervisor' ? t.supervisor : t.attendant}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Paper>
              </Grid>

              <Grid xs={12} md={6}>
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

              <Grid xs={12}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ScheduleIcon color="primary" />
                      <Typography variant="h6" color="primary">
                        Weekly Availability Schedule
                      </Typography>
                    </Box>
                    <Button
                      variant={isEditingSchedule ? "contained" : "outlined"}
                      onClick={isEditingSchedule ? handleSaveSchedule : () => setIsEditingSchedule(true)}
                      startIcon={isEditingSchedule ? <SaveIcon /> : <EditIcon />}
                      sx={isEditingSchedule ? { backgroundColor: '#25D366' } : {}}
                    >
                      {isEditingSchedule ? 'Save Schedule' : 'Edit Schedule'}
                    </Button>
                  </Box>

                  <Stack spacing={2}>
                    {Object.entries(weeklySchedule).map(([day, schedule]) => (
                      <Paper
                        key={day}
                        variant="outlined"
                        sx={{
                          p: 2,
                          backgroundColor: schedule.enabled ? 'rgba(37, 211, 102, 0.05)' : 'transparent'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                          <Box sx={{ minWidth: 120 }}>
                            <Typography variant="body1" fontWeight="500">
                              {getDayName(day)}
                            </Typography>
                          </Box>

                          {isEditingSchedule ? (
                            <>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={schedule.enabled}
                                    onChange={(e) => handleScheduleChange(day as keyof WeeklySchedule, 'enabled', e.target.checked)}
                                    color="primary"
                                  />
                                }
                                label="Available"
                              />
                              {schedule.enabled && (
                                <>
                                  <TextField
                                    type="time"
                                    label="Start Time"
                                    value={schedule.startTime}
                                    onChange={(e) => handleScheduleChange(day as keyof WeeklySchedule, 'startTime', e.target.value)}
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                  />
                                  <TextField
                                    type="time"
                                    label="End Time"
                                    value={schedule.endTime}
                                    onChange={(e) => handleScheduleChange(day as keyof WeeklySchedule, 'endTime', e.target.value)}
                                    size="small"
                                    InputLabelProps={{ shrink: true }}
                                  />
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <Chip
                                label={schedule.enabled ? 'Available' : 'Not Available'}
                                color={schedule.enabled ? 'success' : 'default'}
                                size="small"
                              />
                              {schedule.enabled && (
                                <Typography variant="body2" color="text.secondary">
                                  {schedule.startTime} - {schedule.endTime}
                                </Typography>
                              )}
                            </>
                          )}
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}