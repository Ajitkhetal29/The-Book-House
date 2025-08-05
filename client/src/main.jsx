import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {  HashRouter,BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </HashRouter>
)
