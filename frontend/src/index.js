import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import Root from './root';
import HomePage from './pages/HomePage';
import NosotrosPage from './pages/NosotrosPage.tsx';
import Inventario from './pages/InventarioPage.tsx';
import InventarioItems, {loader as InventarioLoader} from './pages/router_inventory/items.jsx';
import Login from './pages/LoginPage.jsx';
import Register from './pages/RegisterPage.jsx';
import Account from './pages/AccountPage.jsx';
import UserInventory from './pages/UserInventoryPage.jsx';
import UserInventoryNewItem from './pages/router_user_inventory/CreateItem.jsx';
import UserInventoryDestroyItem, {action as DestroyItemAction} from './pages/router_user_inventory/DestroyItem.jsx';
import UserInventoryItems, {loader as UserInventoryItemsLoader, action as UserInventoryItemsAction} from './pages/router_user_inventory/Items.jsx';
import UserInvetoryUpdateItem, {loader as UserInventoryUpdateItemLoader} from './pages/router_user_inventory/UpdateItem.jsx';
import reportWebVitals from './reportWebVitals';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children : [
      {
        path : "/",
        element : <HomePage />,
      },
      {
        path : "/Nosotros",
        element : <NosotrosPage />
      },
      {
        path : "/Inventario",
        element : <Inventario />,
        children : [
          {
            path : "/Inventario",
            element : <InventarioItems />,
            loader : InventarioLoader,
          }
        ]
      },
      {
        path : "/Login",
        element : <Login />,
      },
      {
        path : "/Register",
        element : <Register />
      },
      {
        path : "/Account",
        element : <Account />
      },
      {
        path : "/Inventario-Usuario",
        element : <UserInventory />,
        children : [
          {
            path : "/Inventario-Usuario",
            element : <UserInventoryItems />,
            loader : UserInventoryItemsLoader,
            action : UserInventoryItemsAction,
          },
          {
            path : "/Inventario-Usuario/new",
            element : <UserInventoryNewItem />,
          },
          {
            path : "/Inventario-Usuario/:itemId/edit",
            element : <UserInvetoryUpdateItem />,
            loader : UserInventoryUpdateItemLoader,
          },
          {
            path : "/Inventario-Usuario/:itemId/destroy",
            element : <UserInventoryDestroyItem />,
            action : DestroyItemAction,
          }
        ]
      },
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
