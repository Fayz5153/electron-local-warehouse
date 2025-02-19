import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./style.scss"
import './demos/ipc'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
