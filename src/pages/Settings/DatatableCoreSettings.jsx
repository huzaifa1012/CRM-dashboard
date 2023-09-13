import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { coreSettings } from "../../datatablesource";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import Swal from "sweetalert2";
import { MdDelete } from 'react-icons/md';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'




const DatatableCoreSetting = () => {
    const [users, setUsers] = useState([]);
    const [popUpShow, setPopupshow] = useState(false);
    const [popUpText, setPopupText] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [Open, setModalOpen] = useState(false)
    const [coreName, setCoreName] = useState(false)
    const cancelButtonRef = useRef(null)



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
    const handleAddCore = async () => {
        console.log(coreName)
        try {
            const response = await axios.post('https://studyapi.ieodkv.com/core-settings', {
                name: coreName
            })
            console.log(response.data)
            setModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

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

            <Transition.Root show={Open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setModalOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary sm:mx-0 sm:h-10 sm:w-10">
                                                <HiOutlineViewGridAdd className="h-6 w-6 text-white" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Add Core
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Just enter a core name to create a new core, and press create button
                                                    </p>

                                                    <input type="text" className="w-full p-5 pl-2 border-rounded mt-5 mb-5 rounded"
                                                        onChange={(e) => { setCoreName(e.target.value) }}
                                                        placeholder="Enter Core Name"
                                                        name="" id="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover: sm:ml-3 sm:w-auto"
                                            onClick={() => handleAddCore()}
                                        >
                                            Create Core
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setModalOpen(false)}
                                        // ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

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
                    onClick={() => setModalOpen(true)}
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
