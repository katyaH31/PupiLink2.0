import { ThemeProvider } from '@mui/material'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import PupilinkRoutes from './enums/PupilinkRoutes'
import Home from './pages/Home'
import DefaultTheme from './themes/DefaultTheme'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'


function App() {

  const router = createBrowserRouter([
    {
      path: PupilinkRoutes.ROOT,
      element: <Home/>,
    },
    {
      path: PupilinkRoutes.REGISTER,
      element: <Register/>,
    },
    {
      path: PupilinkRoutes.LOGIN,
      element: <Login/>,
    },
    {
      path: PupilinkRoutes.FORGOT_PASSWORD,
      element: <ForgotPassword />,
    },
  ]);

  return (
    <ThemeProvider theme={DefaultTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
