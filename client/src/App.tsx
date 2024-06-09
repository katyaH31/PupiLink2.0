import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Button, ThemeProvider, Typography } from '@mui/material'
import DefaultTheme from './themes/DefaultTheme'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={DefaultTheme}>
      <Box>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Box>
      <Typography variant='h1'>
        Vite + React
        </Typography>
      <Box className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Typography>
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography>
      </Box>
      <Typography className="read-the-docs">
        Click on the Vite and React logos to learn more
      </Typography>
    </ThemeProvider>
  )
}

export default App
