import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GasMeterIcon from '@mui/icons-material/GasMeter';
const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  // const diff = 20;

  switch (type) {
    case "vendor":
      data = {
        title: "TOTAL VENDORS",
        isMoney: false,
        // link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            
            }}
          />
        ),
      };
      break;
    case "user":
      data = {
        title: "TOTAL USERS",
        isMoney: false,
        // link: "View all orders",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    case "devices":
      data = {
        title: "TOTAL DEVICES",
        isMoney: false,
        // link: "View all orders",
        icon: (
          <GasMeterIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">{data.icon}</div>
      
        <div className="right">
          <span className="title">{data.title}</span>
          <span className="counter">
            {data.isMoney && "$"} {amount}
          </span>
        </div>
      </div>
  );
};

export default Widget;
