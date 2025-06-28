import { Menu } from "antd";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CustomSidebar = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "1":
        navigate("/");
        break;
      // case "2":
      //   navigate("/leads");
      //   break;
      default:
        break;
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" ,marginTop:"1.4rem"}}>
      {/* <Menu
        mode="inline"
        defaultSelectedKeys={["2"]}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{ width: '100%' }}
        items={items}
      /> */}
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleMenuClick}
        defaultSelectedKeys={["1"]}
        items={[
          // {
          //   key: "1",
          //   icon: <MailOutlined />,
          //   label: "Dashboard",
          // },
          {
            key: "1",
            icon: <AppstoreOutlined />,
            label: "Leads",
          },
        ]}
      />
    </div>
  );
};
export default CustomSidebar;
