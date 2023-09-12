import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { coreSettings, userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import Swal from "sweetalert2";
import { MdDelete } from 'react-icons/md';
import { HiOutlineViewGridAdd } from 'react-icons/hi';


const DatatableCoreSetting = () => {
    const [users, setUsers] = useState([]);
    const [popUpShow, setPopupshow] = useState(false);
    const [popUpText, setPopupText] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);




    const FetchStudents = async () => {
        axios
            .get("https://studyapi.ieodkv.com/core-settings")
            .then((response) => {
                if (response.data.length > 0) {
                    setUsers(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {

        FetchStudents()
        console.log(users)
    }, [selectedRows, 0]);

    const askHandleDelete = (userId) => (
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(userId)
            }
        })
    )
    const handleDelete = (id) => {
        axios.delete("https://studyapi.ieodkv.com/students/" + id).then((response) => {
            console.log(response.data);
        });

        setUsers(users.filter((el) => el._id !== id));
        setPopupshow(true);
        setPopupText("User Deleted");
        setTimeout(() => {
            setPopupshow(false);
        }, 2000);
    };

    const askHandleDeleteSelectedRows = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                HandleDeleteSelectedRows()
            }
        })
    }
    const HandleDeleteSelectedRows = async () => {
        selectedRows.forEach((row) => {
            axios.delete("https://studyapi.ieodkv.com/students/" + row).then((response) => {
                setUsers(response.data);
                setPopupshow(true);
                setPopupText(`${selectedRows.length} Users Deleted`);
                if (response.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            });
        });
        setTimeout(() => {
            setPopupshow(false);
        }, 2000);
        setSelectedRows([]);
        FetchStudents()
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 180,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link
                            to={`/data/${params.id}`}
                            style={{ textDecoration: "none" }}>
                            <div className="viewButton">Add Data</div>
                        </Link>
                    </div>
                );
            },
        },
    ];
    return (

        <div className="datatable">


            <div className="datatableTitleWrap">

                <div className="datatableTitle">Core Settings</div>



                {selectedRows.length > 0 ? (
                    <button
                        className="delete_btn"
                        onClick={() => {
                            askHandleDeleteSelectedRows();
                        }}>
                        <MdDelete size={24} /> Delete Selected Rows
                    </button>
                ) : null}
                <button
                    className="add_btn"
                >
                    <HiOutlineViewGridAdd size={20} /> Add core
                </button>
            </div>

            {popUpShow ? (
                <div className="Popupmodal">
                    <div
                        className="popupInner"
                        style={
                            popUpShow && popUpText === "Category Added"
                                ? {
                                    backgroundColor: "#8AFF8A",
                                    borderWidth: 1,
                                    borderColor: "#007500",
                                }
                                : { backgroundColor: "red", borderWidth: 1, borderColor: "red" }
                        }>
                        <PopupAlert popUpText={popUpText} />
                    </div>
                </div>
            ) : (
                ""
            )}
            <DataGrid
                className="datagrid"
                rows={users}
                columns={coreSettings.concat(actionColumn)}
                checkboxSelection={true}
                onSelectionModelChange={(newSelection) => {
                    setSelectedRows(newSelection);
                }}
                getRowId={(row) => {
                    return row._id;
                }}
                pageSize={9}
                rowsPerPageOptions={[9]}
            />
        </div>
    );
};

export default DatatableCoreSetting;
