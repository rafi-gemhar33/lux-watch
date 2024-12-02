import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import { Card, Col, Row } from "antd";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"Categories"}>
      {/* Parent container centered with flex */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="containerh">
          {/* Categories Cards Section */}
          <Row gutter={[16, 16]} justify="center" align="middle">
            {categories.map((c) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                key={c._id}
                className="flex justify-center"
              >
                <Card
                  hoverable
                  className="transition-all duration-300 ease-in-out transform hover:scale-105"
                  cover={
                    <div className="heading">
                      <span className="text-xl font-semibold text-gray-700">
                        {c.name}
                      </span>
                    </div>
                  }
                >
                  <Link
                    to={`/category/${c.slug}`}
                    className="block text-center text-blue-600 font-semibold text-lg hover:text-blue-700 transition duration-200"
                  >
                    Explore
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
