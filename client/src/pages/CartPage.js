import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Container, Row, Col, Card } from "react-bootstrap";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Total price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Container className="cart-page mt-4">
        {/* Header */}
        <Row className="text-center mb-4">
          <Col>
            <h2>{`Hello ${auth?.token && auth?.user?.name} 👋`}</h2>
            <p className="text-muted">
              {cart?.length
                ? `You have ${cart.length} item${
                    cart.length > 1 ? "s" : ""
                  } in your cart ${
                    auth?.token ? "" : "please log in to checkout"
                  }`
                : "Your cart is empty"}
            </p>
          </Col>
        </Row>

        <Row>
          {/* Cart Items */}
          <Col md={8}>
            {cart?.map((p) => (
              <Card key={p._id} className="mb-3">
                <Row>
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>{p.name}</Card.Title>
                      <Card.Text>
                        {p.description.substring(0, 100)}...
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">${p.price}</h5>
                        <Button
                          type="danger"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>

          {/* Cart Summary */}
          <Col md={4}>
            <Card>
              <Card.Header as="h5">Cart Summary</Card.Header>
              <Card.Body>
                <div className="text-center">
                  <h3 className="mb-4">Total: {totalPrice()}</h3>

                  {auth?.user?.address ? (
                    <div>
                      <h5>Shipping Address</h5>
                      <p className="text-muted">{auth?.user?.address}</p>
                      <Button
                        type="link"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </Button>
                    </div>
                  ) : (
                    <div>
                      {auth?.token ? (
                        <Button
                          variant="primary"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Add Shipping Address
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Login to Checkout
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Card.Body>
              <Card.Footer>
                <Button
                  type="primary"
                  block
                  disabled={cart?.length === 0}
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default CartPage;
