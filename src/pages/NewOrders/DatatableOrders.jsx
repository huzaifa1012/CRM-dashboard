import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns } from "../../datatablesource";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const DatatableOrders = () => {
  const [orders, setorders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then((response) => {
        if (response.data.length > 0) {
          const filteredOrders = response.data.filter(
            (order) => order.status[0] !== "Completed"
          );
          setorders(filteredOrders);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/orders/" + id).then((response) => {
      console.log(response.data);
    });
    setPopupText("Order Deleted");
    setPopupshow(true);
    setorders(orders.filter((el) => el._id !== id));
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleUpdateStatus = (status, orderId) => {
    console.log(orderId);
    console.log(status);
    const updatedStatus = {
      status: status,
    };
    axios
      .put("http://localhost:5000/orders/" + orderId, updatedStatus)
      .then((response) => {
        console.log(response.data);
        axios.get("http://localhost:5000/orders").then((response) => {
          if (response.data.length > 0) {
            const filteredOrders = response.data.filter(
              (order) => order.status[0] != "Completed"
            );
            setorders(filteredOrders);
          }
        });
      });
    setPopupText("Order Status Updated");
    setPopupshow(true);
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleDeleteSelectedRows = () => {
    selectedRows.forEach((row) => {
      axios.delete("http://localhost:5000/orders/" + row).then((response) => {
        console.log(response.data);
        setorders(response.data);
        setPopupshow(true);
        setPopupText(`${selectedRows.length} Orders Deleted`);
      });
    });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
    setSelectedRows([]);
  };

  const handleGetData = (selectedRow) => {
    const productIds = [
      ...new Set(selectedRow.items.map((item) => item.productId)),
    ];
    axios
      .get(`http://localhost:5000/products`)
      .then((response) => {
        const products = response.data.filter((product) => {
          return productIds.includes(parseInt(product.productId));
        });
        setSelectedProducts(
          products.map((product) => {
            const item = selectedRow.items.find(
              (item) => item.productId === parseInt(product.productId)
            );
            if (item) {
              product.quantity = item.quantity;
            }
            return product;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actionColumn = [
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <select
              className="input-form"
              defaultValue={params.row.status || "Pending"}
              multiple={false}
              onChange={(e) =>
                handleUpdateStatus(e.target.value, params.row.orderId)
              }>
              <option value="Pending">Pending</option>
              <option value="On the way">On the way</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => {
                setSelectedRow(params.row);
                handleGetData(params.row);
                setOpenModal(true);
              }}>
              View
            </div>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">New Orders</div>
      {selectedRows.length > 0 ? (
        <button
          onClick={() => {
            handleDeleteSelectedRows();
          }}>
          Delete Selected Rows
        </button>
      ) : null}
      {openModal ? (
        <div className="modal">
          <div className="modalInner">
            <p className="closeModal" onClick={() => setOpenModal(false)}>
              &times;
            </p>
            <div
              style={{
                marginLeft: 20,
                marginRight: 20,
                width: 500,
                marginTop: 50,
                marginBottom: 40,
              }}>
              <div className="textWrapper">
                <p className="totalText"> OrderID: </p>
                <p className="totalText"> {selectedRow.orderId}</p>
              </div>
              <div className="textWrapper">
                <p className="totalText"> UserId: </p>
                <p className="totalText"> {selectedRow.userId}</p>
              </div>
              <div className="textWrapper">
                <p className="totalText"> LotteryCode: </p>
                <p className="totalText"> {selectedRow.lotteryCode}</p>
              </div>
              <div className="textWrapper">
                <p className="totalText"> Status: </p>
                <p className="statusPending"> {selectedRow.status}</p>
              </div>
              <div className="modalTable">
                {selectedProducts.map((data) => {
                  return (
                    <div className="borderModal">
                      <div
                        className="modalOrder"
                        key={selectedProducts.productId}>
                        <div className="rowInfo">
                          <img
                            src={`http://localhost:5000/products/${data.image}`}
                            width={"50"}
                            height={"50"}
                            className="img"
                          />
                          <p className="modalText ">
                            {data.name} ({data.quantity})
                          </p>
                        </div>

                        <p className="modalText">
                          {data.price * data.quantity} Rs.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="textWrapper">
                <p className="totalText"> Total Price + Shipping: </p>
                <p className="total"> {selectedRow.totalPrice} Rs.</p>
              </div>
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
              popUpShow && popUpText === "Order Status Updated"
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
        rows={orders}
        columns={orderColumns.concat(actionColumn)}
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

export default DatatableOrders;
