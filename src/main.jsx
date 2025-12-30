import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Main from './Components/Main'
import Feed_RightBar from './Components/Feed_RightBar'
import Login from './Authenticatoin/Login'
import Registration from './Authenticatoin/Registration'
import ContextProvider from './Context/ContextProvider'
import Friend from './LayOut/Friend'
import LogOut from './Authenticatoin/LogOut'
import PrivateRoute from './Authenticatoin/PrivateRoute'


const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><Main></Main></PrivateRoute>,
    children: [
      {
        path: '/',
        element: <Feed_RightBar></Feed_RightBar> 
      },
      {
        path: '/friend',
        element: <Friend></Friend>
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/registration',
    element: <Registration></Registration>
  },
  {
    path: '/logout',
    element: <LogOut></LogOut>
  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </ContextProvider>
  </StrictMode>,
)
