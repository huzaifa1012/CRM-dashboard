import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { coreSettings } from "../../datatablesource";
import DatatableCoreSetting from "./DatatableCoreSettings.jsx";


const CoreSettings = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div>
                    <DatatableCoreSetting />
                </div>
            </div>
        </div>
    );
};

export default CoreSettings;
