import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import App from './App.jsx'
import { Helmet } from 'react-helmet'

const title = () => (
  <div className="text-center">
    <Helmet>
      <meta charSet="utf-8" />
      <title>{"Hello"}</title>
    </Helmet>
  </div>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
