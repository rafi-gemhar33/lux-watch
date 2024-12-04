import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Row, Col, Typography, Spin } from "antd";
import { useCart } from "../context/cart.js";
import { toast } from "sonner";

const { Title, Text } = Typography;

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        {/*<Title level={3} className="text-center">
          Category - {category?.name}
        </Title>
        <Text type="secondary" className="text-center">
          {products?.length} results found
        </Text>*/}

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spin size="large" tip="Loading products..." />
          </div>
        ) : (
          <Row gutter={[16, 24]} justify="start" className="mt-4">
            {products?.map((p) => (
              <Col key={p._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={p.name}
                      src={`/api/v1/product/product-photo/${p._id}`}
                    />
                  }
                  actions={[
                    <Button
                      type="link"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </Button>,
                    <Button
                      type="primary"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      Add to Cart
                    </Button>,
                  ]}
                  className="card-shadow"
                >
                  <Card.Meta
                    title={p.name}
                    description={
                      <div style={{ marginBottom: "16px" }}>
                        <Text type="secondary">
                          {p.description.substring(0, 50)}...
                        </Text>
                      </div>
                    }
                  />
                  <Text strong className="mt-6">
                    ${p.price}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
