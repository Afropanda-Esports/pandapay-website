import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { layoutFullWidth } from './layoutStyles'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen w-full min-w-0" style={layoutFullWidth}>
          <App />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
