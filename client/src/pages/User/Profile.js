import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { toast } from "sonner";
import axios from "axios";
import { Card, Form, Input, Button, Row, Col, Typography } from "antd";

const { Title } = Typography;

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [form] = Form.useForm();

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    form.setFieldsValue({
      name,
      email,
      phone,
      address,
    });
  }, [auth?.user, form]);

  // form function
  const handleSubmit = async (values) => {
    try {
      const { name, email, password, phone, address } = values;
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <Row gutter={[16, 24]}>
          {/* Sidebar Menu */}
          <Col xs={24} md={6}>
            <UserMenu />
          </Col>

          {/* Profile Form */}
          <Col xs={24} md={18}>
            <Title level={2} className="text-center">
              User Profile
            </Title>
            <Card
              bordered={false}
              className="card-shadow"
              style={{ width: "1100px" }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  address: "",
                }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name!" },
                  ]}
                >
                  <Input placeholder="Enter Your Name" />
                </Form.Item>

                <Form.Item label="Email" name="email">
                  <Input disabled placeholder="Enter Your Email" />
                </Form.Item>

                <Form.Item label="Password" name="password">
                  <Input.Password placeholder="Enter Your Password" />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Please enter your phone!" },
                  ]}
                >
                  <Input placeholder="Enter Your Phone" />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: true, message: "Please enter your address!" },
                  ]}
                >
                  <Input placeholder="Enter Your Address" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Profile;
