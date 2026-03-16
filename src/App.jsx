import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'

const router = createBrowserRouter(
      [{ path: "/register", element: <Register />} ,
      { path: "/dashboard", element: <Dashboard/> ,
}])


function App() {

    return  <RouterProvider router={router}></RouterProvider>

}

export default App
