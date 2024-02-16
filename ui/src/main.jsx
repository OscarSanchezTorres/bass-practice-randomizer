import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
//import './index.css'
import AuthContext from './context/auth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext.AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContext.AuthProvider>
  </React.StrictMode>,
)
