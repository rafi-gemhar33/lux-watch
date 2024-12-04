import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const UserMenu = () => {
  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        marginTop: "50px", // Added margin-top for space before the card
      }}
    >
      <h4
        style={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "16px",
        }}
      >
        Dashboard
      </h4>
      <Menu mode="vertical" theme="light" style={{ border: "none" }}>
        <Menu.Item
          key="1"
          icon={<UserOutlined />}
          style={{ display: "flex", alignItems: "center" }}
        >
          <NavLink
            to="/dashboard/user/profile"
            style={{
              textDecoration: "none",
              color: "inherit",
              width: "100%",
            }}
          >
            Profile
          </NavLink>
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<ShoppingCartOutlined />}
          style={{ display: "flex", alignItems: "center" }}
        >
          <NavLink
            to="/dashboard/user/orders"
            style={{
              textDecoration: "none",
              color: "inherit",
              width: "100%",
            }}
          >
            Orders
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default UserMenu;
