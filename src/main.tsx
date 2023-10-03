import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssVarsProvider } from '@mui/joy/styles';
import App from './App'
import './samples/node-api'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DeviceList } from './core/settings/devices/DeviceList';
import { DeviceEdit } from './core/settings/devices/DeviceEdit';
import { Error404 } from './core/general/404';
import DevicesService from './core/settings/devices/DevicesService';
import { ApplicationsList } from './applications/ApplicationsList';
import { EditPomodoro } from './applications/pomodoro/components/Edit';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: "settings/",
        children: [
          {
            path: "devices",
            element: <DeviceList />,
            loader: () => DevicesService.getDevices(),
          },
          {
            path: "devices/new",
            element: <DeviceEdit />,
          },
          {
            path: "devices/:deviceId",
            element: <div>Device</div>,
          },
          {
            path: "devices/:deviceId/edit",
            element: <DeviceEdit />,
            loader: ({ params }) => DevicesService.getDevice(params.deviceId),
          },
        ],
      },
      {
        path: "applications",
        element: <ApplicationsList />,
      },
      {
        path: "applications/pomodoro",
        element: <EditPomodoro />,
      }

    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider defaultMode="dark">
      <RouterProvider router={router} />
    </CssVarsProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
