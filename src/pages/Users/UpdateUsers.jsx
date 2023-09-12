import "../../style/new.scss";
import "../../style/Custom/style.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import Swal from "sweetalert2";
import { MdVerified } from 'react-icons/md';
import { VscUnverified } from 'react-icons/vsc';

const UpdateUsers = ({ title }) => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");

  const { id } = useParams();
  console.log('id', id)
  console.log(email);

  useEffect(() => {
    axios
      .get("https://studyapi.ieodkv.com/students")
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data.find((user) => user._id === id);
          if (user) {
            setUser(user)
            setName(user.firstname);
            setName2(user.lastname);
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
      firstname: name,
      lastname: name2,
      email: email,
      password: password,
      phoneNo: phoneNo,
      address: address,
      userId: userId,
    };

    setName("");
    setName2("");
    setemail("");
    setPhoneNo("");
    setAddress("");

    axios
      .patch(`https://studyapi.ieodkv.com/students/admin/${id}`, user)
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          Swal.fire(
            `${name} Profile Updated!`,
            'All changes you made is up to dated !',
            'success'
          )
        }
      })

      .catch((err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Faild to update user profile',
        })
      });

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
                <label className="label-form"
                  style={{ marginBottom: '0px', marginTop: '15px' }}
                >First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input-form"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="label-form"
                  style={{ marginBottom: '0px', marginTop: '15px' }}
                >Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input-form"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                />
                <label className="label-form"
                  style={{ marginBottom: '0px', marginTop: '15px' }}
                >Password</label>
                <input
                  type="text"
                  placeholder="●●●●●●●"
                  className="input-form"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="createButton mt-15">Update</button>
              </div>
            </form>
          </div>
          <div className="left_mine">
            {user &&
              <>
                <h2>{user.firstname} {user.isVerified ? <MdVerified color="green" /> : <VscUnverified color="red" />} </h2>
                <p className="mtb"><strong>Name:</strong> {user.firstname + " " + user.lastname}</p>
                <p className="mtb"><strong>Email:</strong> {user.email}</p>
                {user.gender && <p className="mtb"><strong>Gender:</strong> {user.gender}</p>}
                {user.phoneNo && <p className="mtb"><strong>Phone:</strong> {user.phoneNo}</p>}
                {user.region && <p className="mtb"><strong>Region:</strong> {user.region}</p>}
                {user.countryLivingIn && <p className="mtb"><strong>Country Living:</strong> {user.countryLivingIn}</p>}
                {user.province && <p className="mtb"><strong>Province:</strong> {user.province}</p>}
                {user.city && <p className="mtb"><strong>City:</strong> {user.city}</p>}
                {user.nationality && <p className="mtb"><strong>Nationality:</strong> {user.nationality}</p>}
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUsers;
