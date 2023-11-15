import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import "../Components/Gallery.css";

export default function Gallery() {
  const closeIconStyles = {
    position: "fixed",
    top: "90px",
    right: "15px",
    width: "2rem",
    height: "2rem",
    padding: "5px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    color: "#ffffff",
    cursor: "pointer",
  };

  const [data, setData] = useState([]);
  const [model, setModel] = useState(false);
  const [tempimgsrc, setTempImgSrc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");

  const getImg = (imageBase64, name) => {
    setTempImgSrc(`data:image/jpeg;base64,${imageBase64}`);
    setText(name);
    setModel(true);
  };

  useEffect(() => {
    // Fetch sorted data when the component mounts
    axios
      .get("http://localhost:8080/api/products/all")
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  });

  return (
    <div className="GalCon">
      <div className={model ? "model open" : "model"}>
        <div className="flex flex-col">
          <img src={tempimgsrc} alt="" />
          <div className="image-text">{text}</div>
        </div>
        <CloseIcon
          onClick={() => setModel(false)}
          style={closeIconStyles}
          className="custom-close-icon"
        />
      </div>
      {/* <h1 className="flex items-center justify-center">Gallery</h1> */}
      {/* <NavLink to="/">
          Home
      </NavLink> */}
      <div className="gallery">
        <h1 className="heading pl-10">Gallery</h1>
      </div>
      <div className="gallery">
        {isLoading ? (
          <h1>Loading......</h1>
        ) : (
          data.map((item, index) => {
            return (
              <div
                className="pics"
                key={index}
                onClick={() => {
                  getImg(item.imageBase64, item.name);
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${item.imageBase64}`}
                  className="custom-w-100"
                  alt=""
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
