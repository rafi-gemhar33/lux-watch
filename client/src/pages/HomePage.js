import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio, Button } from "antd";
import { Prices } from "../components/Prices";
import { ShoppingCartOutlined, PlusOutlined } from "@ant-design/icons";
import { useCart } from "../context/cart.js";
import { toast } from "sonner";
import { Typography } from "antd";

const { Title } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="home-container">
        <div className="filter-sidebar">
          <h4 className="filter-title">Filter By Category</h4>
          <div className="filter-category">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="filter-title mt-4">Filter By Price</h4>
          <Radio.Group
            onChange={(e) => setRadio(e.target.value)}
            className="filter-price"
          >
            {Prices?.map((p) => (
              <Radio key={p._id} value={p.array}>
                {p.name}
              </Radio>
            ))}
          </Radio.Group>
          <button
            className="btn-reset"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>

        <div className="product-list">
          <Title level={2} style={{ textAlign: "left", color: "#f39c12" }}>
            ALL PRODUCTS
          </Title>

          <div className="product-cards">
            {products?.map((p) => (
              <div className="product-card" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="product-image"
                />
                <div className="product-body">
                  <h5 className="product-title">{p.name}</h5>
                  <p className="product-description">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="product-price">${p.price}</p>
                  <div className="product-buttons">
                    {/* Ant Design Button for "More Details" */}
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </Button>
                    {/* Ant Design Add to Cart Button with Icon */}
                    <Button
                      icon={<ShoppingCartOutlined />}
                      type="primary"
                      className="btn-add-to-cart"
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
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products && products.length < total && (
            <div className="load-more">
              <button
                className="btn-loadmore"
                onClick={() => setPage(page + 1)}
                disabled={loading}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
