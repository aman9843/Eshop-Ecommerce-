import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { detailsProducts, productUpdate } from "../../actions/productActions";

import FormContainer from "../FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";

// Edit user Via Admin

const ProductEditScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const productsDetails = useSelector((state) => state.productsDetails);
  const { loading, error, products } = productsDetails;

  const productsUpdate = useSelector((state) => state.productsUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productsUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!products.name || products._id !== params.id) {
        dispatch(detailsProducts(params.id));
      } else {
        setName(products.name);
        setImage(products.image);
        setDescription(products.description);
        setBrand(products.brand);
        setPrice(products.price);
        setCountInStock(products.countInStock);
        setCategory(products.category);
      }
    }
  }, [dispatch, products, params, history, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productUpdate({
        _id: params.id,
        name,
        image,
        description,
        brand,
        countInStock,
        price,
        category,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Upload Image"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              ></Form.Control>
              <Form.Group controlId="image-file" className="mb-3" onChange={uploadFileHandler}>
                <Form.Label>Choose File</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="countInStock"
                value={countInStock}
                onChange={(e) => {
                  setCountInStock(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Button className="my-3" type="submit" variant="primary">
              Update Product Data
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
