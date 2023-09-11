import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const UpdateUsers = ({ title }) => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");

  const { id } = useParams();

  console.log(email);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data.find((user) => user._id === id);
          if (user) {
            setName(user.name);
            setemail(user.email);
            setPhoneNo(user.phoneNo);
            setAddress(user.address);
            setUserId(user.userId);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const user = {
      _id: id,
      name: name,
      email: email,
      phoneNo: phoneNo,
      address: address,
      userId: userId,
    };

    setName("");
    setemail("");
    setPhoneNo("");
    setAddress("");

    axios
      .post(`http://localhost:5000/users/update/${id}`, user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setPopupshow(true);
    setPopupText("Category Updated");
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
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
            <form className="form-new" onSubmit={handleUpdate}>
              <div className="formInput">
                <label className="label-form">Name</label>
                <input
                  type="text"
                  placeholder="Areeba"
                  className="input-form"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="label-form">Email</label>
                <input
                  type="text"
                  placeholder="areeba@gmail.com"
                  className="input-form"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <label className="label-form">Phone No.</label>
                <input
                  type="text"
                  placeholder="0333-333333"
                  className="input-form"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
                <label className="label-form">Address</label>
                <input
                  type="text"
                  placeholder="ABC Street"
                  className="input-form"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button className="createButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUsers;
