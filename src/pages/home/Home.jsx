import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";

import PieChart from "../../components/chart/PieChart";
import axios from "axios";
import Swal from "sweetalert2";

const Home = () => {


  const uploadDriveData = async () => {
    try {
      const response = await axios.post("https://studyapi.ieodkv.com/post");
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire(
          'Uploaded!',
          'Manual drive data uploaded !',
          'success'
        )
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="vendor" />
          <Widget type="user" />
          <Widget type="devices" />
        </div>
        <div className="charts">

          <button onClick={uploadDriveData}> Upload Data </button>
          {/* <PieChart /> */}

        </div>
      </div>
    </div>
  );
};

export default Home;
