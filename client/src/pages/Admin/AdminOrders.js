import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select, Row, Col, Card, Typography, Table, Tag } from "antd";

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

  // Fetch orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
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
          <Tag color="green">Success</Tag>
        ) : (
          <Tag color="red">Failed</Tag>
        ),
    },
    {
      title: "Quantity",
      dataIndex: ["products"],
      render: (products) => products?.length || 0,
    },
  ];

  return (
    <Layout title="All Orders">
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <Title level={3} className="text-center">
            All Orders
          </Title>
          <Row gutter={[20, 20]}>
            {orders.length > 0 ? (
              orders.map((order) => (
                <Card
                  key={order._id}
                  style={{
                    marginBottom: "20px",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <Table
                    dataSource={[order]}
                    columns={columns}
                    rowKey="_id"
                    pagination={false}
                  />
                  <Title level={5} style={{ marginTop: "20px" }}>
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
                            width: "200px", // Fixed width
                            height: "300px", // Fixed height
                            textAlign: "center", // Center content
                          }}
                          cover={
                            <img
                              src={`/api/v1/product/product-photo/${product._id}`}
                              alt={product.name}
                              style={{
                                height: "150px",
                                objectFit: "cover",
                                margin: "auto",
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
                                <Text>
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
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
