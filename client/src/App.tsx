import { CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PupilinkRoutes from './enums/PupilinkRoutes'
import Home from './pages/Home'
import DefaultTheme from './themes/DefaultTheme'
import NotFound from './pages/NotFound'


function App() {

  const router = createBrowserRouter([
    {
      path: PupilinkRoutes.ROOT,
      element: <Home />,
      errorElement: <NotFound />
    },
  ]);

  return (
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
