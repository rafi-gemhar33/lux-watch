import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { Button, Card, Col, Row, Typography, notification } from "antd";

const { Title, Text } = Typography;

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price calculation
  const totalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price, 0)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
  };

  // Remove item from the cart
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Get the payment gateway token
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

  // Handle payment
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
      navigate("/dashboard/user/orders");
      notification.success({
        message: "Payment Completed",
        description: "Your payment was successful!",
      });
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
      <div className="container">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={2} className="text-center">
              Hello {auth?.token && auth?.user?.name}
            </Title>
            <Text className="text-center">
              {cart.length
                ? `You have ${cart.length} items in your cart`
                : "Your cart is empty"}
            </Text>
          </Col>

          <Col xs={24} md={16}>
            {cart.map((product) => (
              <Card
                key={product._id}
                hoverable
                className="mb-3"
                cover={
                  <img
                    alt={product.name}
                    src={`/api/v1/product/product-photo/${product._id}`}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                }
                actions={[
                  <Button
                    type="primary"
                    danger
                    onClick={() => removeCartItem(product._id)}
                    style={{ width: "100%" }}
                  >
                    Remove
                  </Button>,
                ]}
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Title level={4}>{product.name}</Title>
                <Text>{product.description.substring(0, 30)}...</Text>
                <p style={{ fontWeight: "bold" }}>Price: {product.price}</p>
              </Card>
            ))}
          </Col>

          <Col xs={24} md={8}>
            <Card
              title="Cart Summary"
              bordered
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                Total: {totalPrice()}
              </Text>
              <div className="mt-3">
                {auth?.user?.address ? (
                  <>
                    <Title level={5}>Current Address</Title>
                    <Text>{auth?.user?.address}</Text>
                    <Button
                      type="link"
                      onClick={() => navigate("/dashboard/user/profile")}
                      style={{ padding: 0 }}
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
                      ? "Update Address"
                      : "Please log in to checkout"}
                  </Button>
                )}
              </div>

              {clientToken && cart.length > 0 && (
                <div className="mt-4">
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <Button
                    type="primary"
                    block
                    onClick={handlePayment}
                    loading={loading}
                    disabled={!instance || !auth?.user?.address}
                    style={{ borderRadius: "8px" }}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </Button>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default CartPage;
