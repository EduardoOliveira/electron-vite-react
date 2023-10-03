import { useMemo, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import './App.css'
import Layout from './core/components/Layout';
import Menu from './core/components/Menu';
import Navigation from './core/components/Navigation';
import { Outlet } from "react-router-dom";
// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, Input, Typography } from '@mui/joy';

import { CloseButton } from './core/components/atom/CloseButton';
import { MinimizeButton } from './core/components/atom/MinimizeButton';
import { MaximizeButton } from './core/components/atom/MaximizeButton';
import { ColorSchemeToggle } from './core/components/atom/ColorSchemeToggle';
import { SelectedDevice } from './core/contexts/SelectedDevice';
import { Device } from './core/entities/Device';
import DevicesService from './core/settings/devices/DevicesService';

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device>({} as Device);

  useMemo(() => {
    DevicesService.getSelectedDevice().then((device) => {
      console.log('selected device', device);
      setSelectedDevice(device);
    });
  },[]);

  return (
    <>
      <CssVarsProvider disableTransitionOnChange>
        <SelectedDevice.Provider value={{ selectedDevice, setSelectedDevice }}>
          <CssBaseline />
          {drawerOpen && (
            <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
              <Navigation />
            </Layout.SideDrawer>
          )}
          <Layout.Root
            sx={{
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
                md: 'minmax(160px, 300px) minmax(600px, 1fr)',
                //md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
              },
              ...(drawerOpen && {
                height: '100vh',
                overflow: 'hidden',
              }),
            }}
          >
            <Layout.Header>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <IconButton
                  variant="outlined"
                  size="sm"
                  onClick={() => setDrawerOpen(true)}
                  sx={{ display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <IconButton
                  size="sm"
                  variant="soft"
                  sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                >
                  <FindInPageRoundedIcon />
                </IconButton>
                <Typography component="h1" fontWeight="xl">
                  {selectedDevice?.shadow?.name ? selectedDevice.shadow.name : "Ticco suite"}
                </Typography>
              </Box>
              <Input
                size="sm"
                variant="outlined"
                placeholder="Search anything…"
                startDecorator={<SearchRoundedIcon color="primary" />}
                endDecorator={
                  <IconButton variant="outlined" color="neutral">
                    <Typography fontWeight="lg" fontSize="sm" textColor="text.icon">
                      ⌘ + k
                    </Typography>
                  </IconButton>
                }
                sx={{
                  flexBasis: '500px',
                  display: {
                    xs: 'none',
                    sm: 'flex',
                  },
                  boxShadow: 'sm',
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
                <IconButton
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                >
                  <SearchRoundedIcon />
                </IconButton>

                <Menu
                  id="app-selector"
                  control={
                    <IconButton
                      size="sm"
                      variant="soft"
                      color="neutral"
                      aria-label="Apps"
                    >
                      <GridViewRoundedIcon />
                    </IconButton>
                  }
                  menus={[
                    {
                      label: 'Email',
                      href: '/joy-ui/getting-started/templates/email/',
                    },
                    {
                      label: 'Team',
                      href: '/joy-ui/getting-started/templates/team/',
                    },
                    {
                      label: 'Files',
                      active: true,
                      'aria-current': 'page',
                      href: '/joy-ui/getting-started/templates/files/',
                    },
                  ]}
                />
                <ColorSchemeToggle />
                <MinimizeButton />
                <MaximizeButton />
                <CloseButton />
              </Box>
            </Layout.Header>
            <Layout.SideNav>
              <Navigation />
            </Layout.SideNav>
            <Outlet />
          </Layout.Root>
        </SelectedDevice.Provider>
      </CssVarsProvider>
    </>
  )
}

export default App