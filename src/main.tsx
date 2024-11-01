import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Tokenizer } from './pages/tokenizer.tsx'
import { App } from './App.tsx'
import { Prastara } from './pages/prastara.tsx'

const Main = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
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
  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
