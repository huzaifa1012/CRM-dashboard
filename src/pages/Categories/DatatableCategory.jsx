import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { categoryColumns } from "../../datatablesource";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const DatatableCategory = () => {
  const [categories, setcategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        if (response.data.length > 0) {
          setcategories(response.data);
          setCategoryName(response.data[0].name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const category = {
      name: categoryName,
    };

    axios
      .post("http://localhost:5000/categories", category)
      .then((res) => {
        console.log(res.data);
        setcategories(res.data);
        setPopupText(`Category Added`);
        setCategoryName("");
        setPopupshow(true);
        setOpenModal(false);
        setErrorMessage(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorMessage(true);
      });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/categories/" + id).then((response) => {
      console.log(response.data);
    });
    setcategories(categories.filter((el) => el._id !== id));
    setPopupshow(true);
    setPopupText("Category Deleted");
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleDeleteSelectedRows = () => {
    selectedRows.forEach((row) => {
      axios
        .delete("http://localhost:5000/categories/" + row)
        .then((response) => {
          setcategories(response.data);
          setPopupshow(true);
          setPopupText(`${selectedRows.length} Categories Deleted`);
        });
    });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
    setSelectedRows([]);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 500,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Categories
        <div
          className="link-new"
          onClick={() => {
            setOpenModal(true);
            setCategoryName("");
          }}
        >
          Add Category
        </div>
      </div>
      {selectedRows.length > 0 ? (
        <button
          onClick={() => {
            handleDeleteSelectedRows();
          }}
        >
          Delete Selected Rows
        </button>
      ) : null}
      {openModal ? (
        <div className="modal">
          <div className="modalInner">
            <p
              className="closeModal"
              onClick={() => {
                setOpenModal(false);
                setErrorMessage(false);
              }}
            >
              X
            </p>
            <div style={{ margin: 40 }}>
              {errorMessage ? (
                <div style={{ color: "red", fontSize: 10 }}>
                  Category already exist
                </div>
              ) : (
                ""
              )}
              <form className="category-new" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Category Name"
                  className="category-form"
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                />

                <button className="createButton">Add</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
            }
          >
            <PopupAlert popUpText={popUpText} />
          </div>
        </div>
      ) : (
        ""
      )}

      <DataGrid
        className="datagrid"
        rows={categories}
        columns={categoryColumns.concat(actionColumn)}
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

export default DatatableCategory;
