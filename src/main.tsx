
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import Homepage from './pages/Homepage.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <PageNotFound />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)