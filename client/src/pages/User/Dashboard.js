import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { Card, Typography, Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons"; // Import the User icon

const { Title, Text } = Typography;

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid dashboard-container m-3 p-3">
        <Title level={2} className="text-center">
          User Profile
        </Title>
        <Row gutter={[20, 20]}>
          <Col md={6} sm={24}>
            <UserMenu />
          </Col>
          <Col md={18} sm={24}>
            <Card
              bordered={false}
              style={{
                marginTop: "50px",
                padding: "30px",
                width: "1000px",
                borderRadius: "16px",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                background: "#fafafa",
              }}
            >
              <Row gutter={[20, 20]} align="middle">
                <Col>
                  <Avatar
                    size={64}
                    icon={<UserOutlined />} // Add the User icon inside Avatar
                    style={{ backgroundColor: "#87d068", marginBottom: "10px" }} // Optional: Custom background color
                  />
                </Col>
                <Col>
                  <Title level={3} style={{ marginBottom: "8px" }}>
                    {auth?.user?.name}
                  </Title>
                  <Text strong>Email: </Text>
                  <Text>{auth?.user?.email}</Text>
                  <br />
                  <Text strong>Address: </Text>
                  <Text>{auth?.user?.address}</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Dashboard;
