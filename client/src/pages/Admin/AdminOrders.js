import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select, Row, Col, Card, Typography, Table, Tag, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Handle status change
  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Table columns
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
      width: 50,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (orderStatus, record) => (
        <Select
          bordered={false}
          onChange={(value) => handleChange(record._id, value)}
          defaultValue={orderStatus}
          style={{ width: "150px", fontSize: "16px", borderRadius: "4px" }}
        >
          {status.map((s, i) => (
            <Option key={i} value={s}>
              {s}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Buyer",
      dataIndex: ["buyer", "name"],
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Date",
      dataIndex: "createAt",
      render: (date) => moment(date).fromNow(),
    },
    {
      title: "Payment",
      dataIndex: ["payment", "success"],
      render: (success) =>
        success ? (
          <Tag color="red">Failed</Tag>
        ) : (
          <Tag color="green">Success</Tag>
        ),
    },
    {
      title: "Quantity",
      dataIndex: ["products"],
      render: (products) => products?.length || 0,
    },
  ];

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="mb-4">All Orders</h1>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
              >
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
                />
              </div>
            ) : (
              <Row gutter={[20, 20]}>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <Card
                      key={order._id}
                      hoverable
                      style={{
                        marginBottom: "20px",
                        border: "1px solid #f0f0f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Table
                        dataSource={[order]}
                        columns={columns}
                        rowKey="_id"
                        pagination={false}
                        style={{ marginBottom: "20px" }}
                      />
                      <Title
                        level={5}
                        style={{
                          marginTop: "20px",
                          fontSize: "20px",
                          color: "#333",
                        }}
                      >
                        Products
                      </Title>
                      <Row gutter={[16, 16]} justify="start">
                        {order.products.map((product) => (
                          <Col
                            key={product._id}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Card
                              hoverable
                              style={{
                                width: "200px",
                                height: "300px",
                                textAlign: "center",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              }}
                              cover={
                                <img
                                  src={`/api/v1/product/product-photo/${product._id}`}
                                  alt={product.name}
                                  style={{
                                    height: "150px",
                                    objectFit: "cover",
                                    margin: "auto",
                                    borderRadius: "4px",
                                  }}
                                />
                              }
                              bodyStyle={{
                                padding: "10px",
                              }}
                            >
                              <Card.Meta
                                title={product.name}
                                description={
                                  <>
                                    <Text type="secondary">
                                      {product.description.substring(0, 30)}...
                                    </Text>
                                    <br />
                                    <Text strong>Price: ${product.price}</Text>
                                  </>
                                }
                              />
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Card>
                  ))
                ) : (
                  <Text>No orders found.</Text>
                )}
              </Row>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
