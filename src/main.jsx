import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { seedIfEmpty, maybeResetOnLoad, scheduleResetOnNextLoad } from './lib/localDB'

// One-time reset logic (safe for production rollouts)
maybeResetOnLoad()
seedIfEmpty()
// Optional: expose a helper to schedule a reset on next reload
if (typeof window !== 'undefined'){
  // call window.scheduleDbReset() in console to purge localStorage on next reload
  window.scheduleDbReset = scheduleResetOnNextLoad
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
