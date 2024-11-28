import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Registation from './components/Registation.jsx'
import Login from './components/Login.jsx'
import PassForget from './components/PassForget.jsx'
import UserHome from './components/UserHome.jsx'
import WrongUrl from './components/WrongUrl.jsx'
import VendorRegistation from './components/VendorRegistation.jsx'
import VendorLogin from './components/VendorLogin.jsx'
import VendorHome from './components/VendorHome.jsx'
import VendorPass from './components/VendorPassForget.jsx'
import MaterialDetail from './components/MaterialDetail.jsx'
import PieChart from './components/PieChart.jsx'
import DropDown from './components/DropDown.jsx'
import './index.css'
import 'react-toastify/ReactToastify.css'
import {
  createBrowserRouter,
  // Outlet,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/user-signup",
    element:<Registation/>
  },
  {
    path: "/user-login",
    element: <Login/>
  },
  {
    path:"/user-password-reset",
    element:<PassForget/>
  },
  {
    path: "/user-home",
    element: <UserHome/>
  },
  {
    path: "/vendor-signup",
    element:<VendorRegistation/>
  },
  {
    path: "/vendor-login",
    element: <VendorLogin/>
  },
  {
    path:"/vendor-password-reset",
    element: <VendorPass/>
  },
  {
    path: "/vendor-home",
    element:<VendorHome/>
  },
  {
    path:"material/:id",
    element: <MaterialDetail/>
  },
  {
    path:"/pie-chart",
    element:<PieChart/>
  },
  {
    path:"/demo",
    element:<DropDown/>
  },
  {
    path:"*",
    element:<WrongUrl/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
