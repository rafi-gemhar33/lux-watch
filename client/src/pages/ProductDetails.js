import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "antd";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Product Details Section */}
        <div className="bg-gradient-to-br from-gray-100 to-white shadow-xl rounded-lg p-10 mb-12 flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="rounded-lg max-w-[500px] object-cover shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {product.description}
              </p>
              <p className="text-3xl font-semibold text-blue-600 mb-4">
                Price: ${product.price}
              </p>
              <p className="text-lg text-gray-600">
                Category:{" "}
                <span className="font-medium text-gray-800">
                  {product?.category?.name}
                </span>
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <Button type="primary" size="large" className="rounded-lg">
                Add to Cart
              </Button>
              <Button
                type="default"
                size="large"
                className="rounded-lg"
                onClick={() => navigate("/")}
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            You May Also Like...
          </h2>
          {relatedProducts.length < 1 && (
            <p className="text-center text-gray-500">
              No Similar Products Found
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts?.map((p) => (
              <Card
                key={p._id}
                hoverable
                className="shadow-md transform hover:scale-105 transition-all duration-300 rounded-lg"
                cover={
                  <img
                    src={`/api/v1/product/product-photo/${p?._id}`}
                    alt={p.name}
                    className="rounded-t-lg object-cover h-48"
                  />
                }
              >
                <Card.Meta
                  title={
                    <span className="text-lg font-semibold text-gray-800">
                      {p.name}
                    </span>
                  }
                  description={
                    <span className="text-sm text-gray-500">
                      {p.description.substring(0, 40)}...
                    </span>
                  }
                />
                <p className="text-blue-600 font-bold mt-4">${p.price}</p>
                <div className="flex justify-between items-center mt-4">
                  <Button
                    type="link"
                    className="text-blue-600"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    View Details
                  </Button>
                  <Button type="default" className="rounded-lg">
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
