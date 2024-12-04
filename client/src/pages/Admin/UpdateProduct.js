import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import { toast } from "sonner";
import axios from "axios";
import { Select, Button, Card, Input, Space, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // Fetch a single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      const product = data.product;
      setName(product.name);
      setId(product._id);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setShipping(product.shipping);
      setCategory(product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product details.");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong fetching categories.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product updated successfully");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 1000);
      } else {
        toast.error(data?.message || "Failed to update product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the product.");
    }
  };

  // Delete product function with modern modal confirmation
  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      icon: <DeleteOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const { data } = await axios.delete(
            `/api/v1/product/delete-product/${id}`
          );
          if (data?.success) {
            toast.success("Product deleted successfully");
            setTimeout(() => {
              navigate("/dashboard/admin/products");
            }, 1000);
          } else {
            toast.error("Failed to delete product");
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong while deleting the product.");
        }
      },
      onCancel: () => {
        console.log("Delete action cancelled");
      },
    });
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <Card
              title="Update Product"
              bordered={false}
              className="product-form-card"
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select"
                    onChange={(value) => setCategory(value)}
                    value={category}
                  >
                    {categories.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary w-100 upload-label">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "200px" }}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`/api/v1/product/product-photo/${id}`}
                        alt="product_photo"
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "200px" }}
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <Input
                    value={name}
                    placeholder="Product Name"
                    size="large"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Input.TextArea
                    value={description}
                    placeholder="Product Description"
                    size="large"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Input
                    type="number"
                    value={price}
                    placeholder="Price"
                    size="large"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Input
                    type="number"
                    value={quantity}
                    placeholder="Quantity"
                    size="large"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping"
                    size="large"
                    className="form-select"
                    onChange={(value) => setShipping(value)}
                    value={shipping ? "yes" : "no"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3 text-end">
                  <Space size="middle">
                    <Button
                      type="primary"
                      size="large"
                      icon={<EditOutlined />}
                      onClick={handleUpdate}
                    >
                      Update Product
                    </Button>
                    <Button
                      type="danger"
                      size="large"
                      icon={<DeleteOutlined />}
                      onClick={handleDelete}
                    >
                      Delete Product
                    </Button>
                  </Space>
                </div>
              </Space>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
