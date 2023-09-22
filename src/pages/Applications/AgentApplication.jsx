import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableAgentApplication from "./DatatableAgentApplications.jsx";


const AgentApplication = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div>
                    <DatatableAgentApplication />
                </div>
            </div>
        </div>
    );
};

export default AgentApplication;
