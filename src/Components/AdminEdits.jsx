import React, { useState } from "react";
import axios from "axios";
import "../Components/AdminEdits.css";

export default function AdminEdits() {
  const [product, setProduct] = useState({
    name: "",
    imageFile: null, // for file input
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProduct({ ...product, imageFile: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    // formData.append('price', product.price);
    // formData.append('quantity', product.quantity);
    formData.append("imageFile", product.imageFile);

    try {
      await axios.post(
        "https://srimuruganapi.onrender.com/api/products/insert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Reset the form or display a success message
      console.log("Product added successfully");
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <div className="div">
      <h2 className="h2">Add Construction</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="div">
          <label className="labe;">Name:</label>
          <input
            className="input"
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="div">
          <label className="label">Image:</label>
          <input
            className="input"
            type="file"
            name="imageFile"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="button">
          Add Construction
        </button>
      </form>
    </div>
  );
}
