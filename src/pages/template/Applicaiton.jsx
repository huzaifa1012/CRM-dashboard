import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableTemplate from "./DatatableTemplate.jsx";


const Template = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div>
                    <DatatableTemplate />
                </div>
            </div>
        </div>
    );
};

export default Template
