import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableApplications from "./DatatableApplications.jsx";


const Applications = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div>
                    <DatatableApplications />
                </div>
            </div>
        </div>
    );
};

export default Applications;
