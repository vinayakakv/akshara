import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Tokenizer } from './pages/tokenizer.tsx'
import { Prastara } from './pages/prastara.tsx'
import { Home } from './pages/home.tsx'
import { KatapayadiDecoder } from './pages/katapayadiDecoder.tsx'
import { Transliterate } from './pages/transliterate.tsx'
import { App } from './App.tsx'

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
      {
        path: 'katapayadi-decoder',
        element: <KatapayadiDecoder />,
      },
      {
        path: 'transliterate',
        element: <Transliterate />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
