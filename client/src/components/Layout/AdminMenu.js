import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  PlusCircleOutlined,
  UserOutlined,
  UnorderedListOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

const AdminMenu = () => {
  return (
    <div className="admin-menu-container">
      <Menu mode="vertical" theme="light" className="admin-menu">
        <Menu.Item key="create-category" icon={<PlusCircleOutlined />}>
          <NavLink
            to="/dashboard/admin/create-category"
            className="admin-menu-link"
          >
            Create Category
          </NavLink>
        </Menu.Item>
        <Menu.Item key="create-product" icon={<PlusCircleOutlined />}>
          <NavLink
            to="/dashboard/admin/create-product"
            className="admin-menu-link"
          >
            Create Product
          </NavLink>
        </Menu.Item>
        <Menu.Item key="products" icon={<UnorderedListOutlined />}>
          <NavLink to="/dashboard/admin/products" className="admin-menu-link">
            Products
          </NavLink>
        </Menu.Item>
        <Menu.Item key="orders" icon={<ShoppingOutlined />}>
          <NavLink to="/dashboard/admin/orders" className="admin-menu-link">
            Orders
          </NavLink>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <NavLink to="/dashboard/admin/users" className="admin-menu-link">
            Users
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AdminMenu;
