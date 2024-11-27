import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Card, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons"; // Import the Edit icon
const { Meta } = Card;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
      setLoading(false);
    }
  };

  // Lifecycle method to fetch products
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center my-4">All Products List</h1>
            {loading ? (
              <div
                className="text-center"
                style={{
                  height: "80vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spin size="large" />
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {products?.map((p) => (
                  <div key={p._id} className="col mb-4">
                    <Link
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="text-decoration-none"
                    >
                      <Card
                        hoverable
                        cover={
                          <img
                            alt={p.name}
                            src={`/api/v1/product/product-photo/${p._id}`}
                            style={{ objectFit: "cover", height: "200px" }}
                          />
                        }
                        className="product-card"
                        bordered={false}
                        style={{
                          borderRadius: "10px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          position: "relative",
                        }}
                      >
                        <EditOutlined
                          onClick={() =>
                            (window.location.href = `/dashboard/admin/product/edit/${p._id}`)
                          }
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            fontSize: "20px",
                            color: "#1890ff", // Blue color
                            cursor: "pointer",
                            zIndex: 1,
                          }}
                        />
                        <Meta
                          title={p.name}
                          description={
                            <p
                              className="text-truncate"
                              style={{ maxHeight: "50px" }}
                            >
                              {p.description}
                            </p>
                          }
                        />
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
