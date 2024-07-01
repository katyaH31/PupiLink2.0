import { ThemeProvider } from '@mui/material'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import PupilinkRoutes from './enums/PupilinkRoutes'
import Home from './pages/Home'
import DefaultTheme from './themes/DefaultTheme'


function App() {

  const router = createBrowserRouter([
    {
      path: PupilinkRoutes.ROOT,
      element: <Home />,
    },
  ]);

  return (
    <ThemeProvider theme={DefaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
