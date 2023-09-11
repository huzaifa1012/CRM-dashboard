import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableOrdersHistory from "./DatatableOrderHistory";

const OrderHistory = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableOrdersHistory />
      </div>
    </div>
  );
};

export default OrderHistory;
