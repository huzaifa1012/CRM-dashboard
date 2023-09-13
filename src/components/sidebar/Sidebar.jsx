import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [newOrderCount, setNewOrderCount] = useState(0);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then((response) => {
        if (response.data.length > 0) {
          const filteredOrders = response.data.filter(
            (order) => order.status[0] !== "Completed"
          );
          setNewOrderCount(filteredOrders.length);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newOrderCount]);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">E-commerce</span>
        </Link>
      </div>
      <hr className="break-sidebar" />
      <div className="center">
        <ul>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <Link to="/applications" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Applications</span>
            </li>
          </Link>
          <Link to="/core-settings" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Core settings</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Students</span>
            </li>
          </Link>
          <Link to="/applications" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link
            to="/orders"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>New Orders</span>

              <span
                style={{
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "black",
                  paddingLeft: 4,
                  paddingRight: 4,
                  borderRadius: 10,
                }}
              >
                {newOrderCount}
              </span>
            </li>
          </Link>
          <Link to="/ordershistory" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Order History</span>
            </li>
          </Link>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={handleLogout}
          >
            <li>
              <LogoutIcon className="icon" />
              <span className="textfield">Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
