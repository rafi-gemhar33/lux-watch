import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Tag, Typography, Empty } from "antd";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const { Title, Text } = Typography;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  // Fetch orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Define table columns
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "Delivered" ? "green" : "volcano"}>{status}</Tag>
      ),
    },

    {
      title: "Date",
      dataIndex: "createAt",
      render: (date) => moment(date).fromNow(),
    },
    {
      title: "Payment",
      dataIndex: ["payment", "success"],
      render: (success) => (
        <Tag color={success ? "green" : "red"}>
          {success ? "Success" : "Failed"}
        </Tag>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "products",
      render: (products) => products.length,
    },
  ];

  return (
    <Layout title="Your Orders">
      <div className="container-fluid p-3 m-3 dashboard">
        <Row gutter={[20, 20]}>
          <Col span={6}>
            <UserMenu />
          </Col>
          <Col span={18}>
            <Title level={2} className="text-center">
              All Orders
            </Title>
            {orders.length > 0 ? (
              orders.map((order) => (
                <Card
                  key={order._id}
                  style={{ marginBottom: 20 }}
                  title={`Order #${order._id}`}
                  bordered={false}
                  extra={<Text>{moment(order.createAt).fromNow()}</Text>}
                >
                  <Table
                    dataSource={[order]}
                    columns={columns}
                    rowKey="_id"
                    pagination={false}
                  />
                  <Title level={5} style={{ marginTop: 20 }}>
                    Products
                  </Title>
                  <Row gutter={[16, 16]}>
                    {order.products.map((product) => (
                      <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                          hoverable
                          cover={
                            <img
                              src={`/api/v1/product/product-photo/${product._id}`}
                              alt={product.name}
                              style={{
                                height: "150px",
                                objectFit: "cover",
                              }}
                            />
                          }
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
              <Empty />
            )}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Orders;
