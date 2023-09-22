import React from "react";
import Products from "../pages/Products/Products";
import Home from "../pages/home/Home";
import NewProduct from "../pages/Products/NewProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { prductsInputs, productsUpdate } from "../formSource";
import UpdateProduct from "../pages/Products/UpdateProdcut";
import Categories from "../pages/Categories/Categories";
import CoreSettings from "../pages/Settings/CoreSettings.jsx";
import Users from "../pages/Users/Users";
import UpdateUsers from "../pages/Users/UpdateUsers";
import Orders from "../pages/NewOrders/Orders";
import OrderHistory from "../pages/OrderHistory/OrderHistory";
import Login from "../pages/Login/Login";
import OTP from "../pages/OTP/Otp";
import Applications from "../pages/Applications/Applicaiton";
import AgentApplication from "../pages/Applications/AgentApplication";

const role = localStorage.getItem('role')

function Adminroutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/" element={<Login />} />
            <Route path="/verify" element={<OTP />} />
            <Route path="/dashboard" element={<Home />} />

            <Route path="categories">
              <Route index element={<Categories />} />
            </Route>

            <Route path="core-settings">
              <Route index element={<CoreSettings />} />
            </Route>

            <Route path="/applications">
              <Route index element={<Applications />} />
            </Route>
            {role === 'Agent' ?
              <Route path="agent-applications">
                <Route index element={<AgentApplication />} />
              </Route>
              : ""}

            <Route path="products">
              <Route index element={<Products />} />
              <Route
                path="new"
                element={
                  <NewProduct inputs={prductsInputs} title="Add New Product" />
                }
              />
              <Route
                path="update/:id"
                element={
                  <UpdateProduct
                    inputs={productsUpdate}
                    title="Update Products"
                  />
                }
              />
            </Route>
            <Route path="users">
              <Route index element={<Users />} />
              <Route
                path="update/:id"
                element={
                  <UpdateUsers inputs={productsUpdate} title="Update Users" />
                }
              />
            </Route>
            <Route path="orders">
              <Route index element={<Orders />} />
            </Route>
            <Route path="ordershistory">
              <Route index element={<OrderHistory />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Adminroutes;
