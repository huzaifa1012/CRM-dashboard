// products
// columns heading
export const productColumns = [
  { field: "productId", headerName: "ProductID", width: 200 },
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "category", headerName: "Product Category", width: 180 },
  {
    field: "price",
    headerName: "Price",
    width: 180,
  },
];

// category
// column headings
export const categoryColumns = [
  {
    field: "_id",
    headerName: "Name",
    width: 400,
  },
  {
    field: "name",
    headerName: "Name",
    width: 400,
  },
];

// users
// columns heading
export const userColumns = [
  { field: "_id", headerName: "ID", width: 120 },
  { field: "firstname", headerName: "User Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phoneNo", headerName: "Phone No.", width: 180 },
  { field: "countryLivingIn", headerName: "Country", width: 100 },
  { field: "city", headerName: "City", width: 100 },
];

// orders
// columns heading
export const orderColumns = [
  { field: "orderId", headerName: "OrderID", width: 150 },
  { field: "userId", headerName: "UserID", width: 200 },
  { field: "lotteryCode", headerName: "Lottery Code", width: 200 },
];


export const coreSettings = [
  // { field: "name", headerName: "Name", width: 200 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "urlName", headerName: "URL", width: 200 },
];
