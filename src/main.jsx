import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { assetUrl } from './utils/assetUrl'

const favicon = document.querySelector('link[rel="icon"]')
if (favicon) favicon.href = assetUrl('favicon.svg')

const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
