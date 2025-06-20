import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import {
  HomeRounded as HomeRoundedIcon,
  AnalyticsRounded as AnalyticsRoundedIcon,
  PeopleRounded as PeopleRoundedIcon,
  HelpRounded as HelpRoundedIcon,
  Description as DescriptionIcon 
} from '@mui/icons-material';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, path: '/home' },
  { text: 'Pacientes', icon: <PeopleRoundedIcon />, path: '/patients' },
  { text: 'Testes', icon: <AnalyticsRoundedIcon />, path: '/tests' },
  { text: 'Modelos de documentos', icon: <DescriptionIcon />, path: '/docs' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, path: '/feedback' },
];

export default function MenuContent() {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const navigate = useNavigate();

  const handleListItemClick = (index: number, path: string) => {
    setSelectedIndex(index);
    navigate(path);
  };

  return (
    <Stack sx={{ height: '100%', p: 1, justifyContent: 'space-between' }}>
      <List dense disablePadding>
        {mainListItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index, item.path)}
              sx={{
                borderRadius: 1,
                my: 0.5,
                px: 1,
                '&:hover': {
                  backgroundColor: '#8AC0CA',
                  color: '#fff',
                  '& .MuiListItemIcon-root': { color: '#fff' },
                },
                '&.Mui-selected': {
                  backgroundColor: '#8AC0CA !important',
                  color: '#fff !important',
                  '& .MuiListItemIcon-root': { color: '#fff !important' },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#8AC0CA !important',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
