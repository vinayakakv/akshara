import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Tokenizer } from './pages/tokenizer.tsx'
import { App } from './App.tsx'
import { Prastara } from './pages/prastara.tsx'

import './index.css'
import { Home } from './pages/home.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'tokenizer',
        element: <Tokenizer />,
      },
      {
        path: 'prastara',
        element: <Prastara />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
