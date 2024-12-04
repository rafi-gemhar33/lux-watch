import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { Card, Row, Col, Typography, Divider } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card
                style={{
                  width: "100%",
                  maxWidth: "800px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  marginTop: "30px", // Added space before the card header
                }}
                title={
                  <Title style={{ textAlign: "center" }} level={3}>
                    Admin Dashboard{" "}
                  </Title>
                }
                extra={<UserOutlined style={{ fontSize: "24px" }} />}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card style={{ textAlign: "center" }}>
                      <Row justify="center">
                        <Col span={24}>
                          <Text strong style={{ fontSize: "18px" }}>
                            <UserOutlined style={{ marginRight: "8px" }} />
                            Name: {auth?.user?.name}
                          </Text>
                        </Col>
                        <Col span={24}>
                          <Text strong style={{ fontSize: "18px" }}>
                            <MailOutlined style={{ marginRight: "8px" }} />
                            Email: {auth?.user?.email}
                          </Text>
                        </Col>
                        <Col span={24}>
                          <Text strong style={{ fontSize: "18px" }}>
                            <PhoneOutlined style={{ marginRight: "8px" }} />
                            Contact: {auth?.user?.phone}
                          </Text>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
