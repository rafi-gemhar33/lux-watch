import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Space,
  Empty,
  Divider,
  notification,
  Spin,
} from "antd";

const { Title, Text } = Typography;

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price, 0)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Fetch Braintree client token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error("Error fetching client token:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payment process
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      notification.success({
        message: "Payment Completed",
        description: "Your payment was successful!",
      });
      navigate("/dashboard/user/orders");
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Payment Failed",
        description: "There was an issue processing your payment.",
      });
      console.error("Payment error:", error);
    }
  };

  return (
    <Layout>
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "1rem" }}>
          Hello, {auth?.user?.name || "Guest"}
        </Title>
        <Text
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          {cart.length > 0
            ? `You have ${cart.length} items in your cart.`
            : "Your cart is currently empty."}
        </Text>

        {cart.length === 0 ? (
          <Empty
            description="No items in your cart"
            style={{ marginTop: "2rem" }}
          />
        ) : (
          <Row gutter={[16, 16]} justify="center">
            {/* Cart Items */}
            <Col xs={24} md={16}>
              {cart.map((product) => (
                <Card
                  key={product._id}
                  hoverable
                  style={{
                    marginBottom: "1rem",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                  actions={[
                    <Button
                      danger
                      style={{ width: "150px", marginLeft: "500px" }}
                      onClick={() => removeCartItem(product._id)}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <Row align="middle" gutter={[16, 0]}>
                    {/* Small Product Image */}
                    <Col flex="40px">
                      <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          border: "1px solid #f0f0f0",
                        }}
                      />
                    </Col>
                    {/* Product Details */}
                    <Col flex="auto">
                      <Title level={4} style={{ margin: 0 }}>
                        {product.name}
                      </Title>
                      <Text type="secondary">
                        {product.description.substring(0, 50)}...
                      </Text>
                      <div style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
                        Price: {product.price}
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Col>

            {/* Cart Summary */}
            <Col xs={24} md={8}>
              <Card
                title="Cart Summary"
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Total: {totalPrice()}
                  </Text>
                  <Divider />
                  {auth?.user?.address ? (
                    <>
                      <Text>Shipping Address: {auth?.user?.address}</Text>
                      <Button
                        type="link"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="link"
                      onClick={() =>
                        navigate(
                          auth?.token ? "/dashboard/user/profile" : "/login",
                          {
                            state: "/cart",
                          }
                        )
                      }
                    >
                      {auth?.token
                        ? "Add Shipping Address"
                        : "Log in to proceed"}
                    </Button>
                  )}
                </Space>

                {/* Payment Section */}
                {clientToken && cart.length > 0 && (
                  <div style={{ marginTop: "2rem" }}>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <Button
                      type="primary"
                      block
                      onClick={handlePayment}
                      loading={loading}
                      disabled={!instance || !auth?.user?.address}
                      style={{ marginTop: "1rem", borderRadius: "8px" }}
                    >
                      {loading ? <Spin /> : "Make Payment"}
                    </Button>
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
