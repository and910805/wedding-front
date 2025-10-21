import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { assetUrl } from './utils/assetUrl'

const favicon = document.querySelector('link[rel="icon"]')
if (favicon) favicon.href = assetUrl('favicon.svg')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
