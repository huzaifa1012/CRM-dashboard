import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { uid } from "uid";
import PopupAlert from "../../components/popupalert/popupAlert";

const NewProduct = ({ title }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Choose a category");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const randomString = uid();

  const randomDigits = randomString
    .replace(/[^0-9]/g, "") // remove non-digits
    .substring(0, 5); // extract first 5 digits

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        if (response.data.length > 0) {
          setAllCategories(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("productId", randomDigits);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", file);

    axios
      .post("http://localhost:5000/products/new", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.error === "Product already exists") {
          setErrorMessage(true);
          setName("");
          setPrice("");
          setDescription("");
          setCategory("Choose a category");
          setFile(null);
        } else {
          setName("");
          setPrice("");
          setDescription("");
          setCategory("Choose a category");
          setPopupshow(true);
          setPopupText("Category Added");
          setErrorMessage(false);
          setFile(null);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(true); // will log "Product already exists"
      });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleImageUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {popUpShow ? (
          <div className="Popupmodal">
            <div
              className="popupInner"
              style={{
                backgroundColor: "#8AFF8A",
                borderWidth: 1,
                borderColor: "#007500",
              }}>
              <PopupAlert popUpText={popUpText} />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="top-new">
          <h1 className="heading-top">{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            {errorMessage ? (
              <div style={{ color: "red", fontSize: 10 }}>
                Product with same category already exists
              </div>
            ) : null}
            <form
              className="form-new"
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
              action="/upload">
              <div className="formInput">
                <label className="label-form">Product Name</label>
                <input
                  type="text"
                  placeholder="Chicken Biryani"
                  className="input-form"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label className="label-form">Product Price</label>
                <input
                  type="number"
                  placeholder="220"
                  className="input-form"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <label className="label-form">Product Category</label>
                <select
                  className="input-form"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}>
                  <option value="">Choose a category</option>
                  {allCategories.map((data) => {
                    return <option value={`${data.name}`}>{data.name}</option>;
                  })}
                </select>
                <label className="label-form">Product Description</label>
                <textarea
                  name="message"
                  rows="5"
                  cols="10"
                  className="input-form"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <label className="label-form">
                  Product Image (PNG/JPEG/JPG)
                </label>
                <input
                  type="file"
                  id="myFile"
                  accept=".png, .jpg, .jpeg"
                  name="myFile"
                  onChange={handleImageUpload}
                />
                <button className="createButton">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
