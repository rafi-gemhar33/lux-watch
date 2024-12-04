import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import { Card, Col, Row, Typography } from "antd";
import { AppstoreOutlined } from "@ant-design/icons"; // Import the watch icon

const { Title } = Typography;

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"Categories"}>
      {/* Parent container centered */}
      <Row
        justify="center"
        align="middle"
        style={{
          marginLeft: "50px",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          marginTop: "-20px",
        }}
      >
        <Col span={20}>
          {/* Categories Cards Section */}
          <Row gutter={[24, 24]} justify="center">
            {categories.map((c) => (
              <Col xs={24} sm={12} md={8} key={c._id}>
                <Card
                  hoverable
                  style={{
                    width: "350px", // Increased width
                    height: "180px", // Increased height
                    borderRadius: "10px", // Add rounded corners
                    overflow: "hidden", // Ensure content fits within
                  }}
                  className="transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <Row gutter={16} align="middle">
                    {/* Icon Section */}
                    <Col span={8} style={{ textAlign: "center" }}>
                      <AppstoreOutlined
                        style={{
                          fontSize: "80px",
                        }}
                      />
                    </Col>
                    {/* Content Section */}
                    <Col span={16}>
                      <Title level={4} className="text-gray-700">
                        {c.name}
                      </Title>
                      <Link
                        to={`/category/${c.slug}`}
                        className="block text-blue-600 font-semibold hover:text-blue-700 transition duration-200"
                      >
                        Explore
                      </Link>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default Categories;
