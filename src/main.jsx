import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The production build pre-renders the page into #root for search engines; hydrate it if present.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
