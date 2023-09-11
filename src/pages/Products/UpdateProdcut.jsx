import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PopupAlert from "../../components/popupalert/popupAlert";

const UpdateProduct = ({ title }) => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [productId, setProductId] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const { id } = useParams();

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

    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data.find((user) => user._id === id);
          if (user) {
            setName(user.name);
            setCategory(user.category);
            setDescription(user.description);
            setPrice(user.price);
            setProductId(user.productId);
            setFile(user.image);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("productId", productId);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", file);

    axios
      .post(`http://localhost:5000/products/update/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        setPopupshow(true);
        setPopupText("Category Update");
      })
      .catch((err) => {
        console.log(err);
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
        <div className="top-new">
          <h1 className="heading-top">{title}</h1>
        </div>
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
        <div className="bottom">
          <div className="right">
            {errorMessage ? (
              <div style={{ color: "red", fontSize: 10 }}>
                Product with same category already exists
              </div>
            ) : null}
            <form className="form-new" onSubmit={handleUpdate}>
              <div className="formInput">
                <label className="label-form">Product Name</label>
                <input
                  type="text"
                  className="input-form"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="label-form">Product Price</label>
                <input
                  type="number"
                  className="input-form"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label className="label-form">Product Category</label>
                <select
                  className="input-form"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}>
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label className="label-form">
                  Product Image (PNG/JPEG/JPG)
                </label>
                <div className="formInput">
                  <input
                    type="file"
                    id="myFile"
                    accept=".png, .jpg, .jpeg"
                    name="myFile"
                    onChange={handleImageUpload}
                  />
                </div>
                <button className="createButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
