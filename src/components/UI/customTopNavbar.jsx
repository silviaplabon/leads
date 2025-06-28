import { Avatar, Badge, Button, Dropdown, Input, Typography } from "antd";
import {
  CiLoginIcon,
  FaRegUser,
  NotificatonSvgIcon,
} from "../../utils/svgIcons";
import { ExclamationCircleFilled, SearchOutlined } from "@ant-design/icons";
import { CONSTANTS, ThemeData } from "../../utils/util";

const CustomTopNavbar = () => {
  const navigateToDashboard = () => {};

  const menuItems = [
    {
      disabled: true,
      className: `customMenuClass `,
      key: "1",
      icon: (
        <Button
          shape="circle"
          icon={FaRegUser({ height: "13px", width: "13px" })}
          size="small"
          className="headerNavItemButton "
          style={{ border: "1px solid #f1f7f9" }}
        />
      ),
      label: (
        <Typography style={{ fontSize: 13, fontWeight: 800, color: "#000" }}>
          {"Sasanka"}
        </Typography>
      ),
    },
    {
      key: "Logout",
      icon: (
        <Button
          type="text"
          size="small"
          className="headerNavItemButton"
          icon={CiLoginIcon({
            color: "#000",
            height: "20px",
            width: "20px",
          })}
          onClick={navigateToDashboard}
        />
      ),
      className: "bottomBorderMenu",

      label: (
        <>
          <Typography style={{ fontSize: 13, fontWeight: 800, color: "#000" }}>
            Sign Out
          </Typography>
        </>
      ),
    },
  ];

  const handleLogOut = () => {
    confirm({
      title: `Are you sure you want to sign out?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      cancelText: "No",
      onOk() {
        localStorage.removeItem(CONSTANTS.localStorageRequests);
      },
      onCancel() {},
    });
  };
  const menuProps = {
    items: menuItems,
    onClick: handleLogOut,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.7rem 3.5rem 0.9rem 1.2rem",
        backgroundColor: '#fff',
      }}
    >
      <div>
        <Input
          style={{ height: "28px", marginRight: "0.5rem" ,width:'200px',borderRadius:'15px'}}
          placeholder="Search"
          prefix={<SearchOutlined />}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ paddingRight: "1.5rem" }}>
            {" "}
            <Badge count={10} style={{backgroundColor:ThemeData.primary}}>
              <Avatar
                shape="square"
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: ThemeData.primary,
                  cursor: "pointer",
                }}
              >
                {NotificatonSvgIcon({ height: "20px", width: "20px" })}
              </Avatar>
            </Badge>
          </div>

          <Dropdown
            trigger={["click"]}
            menu={menuProps}
            placement="bottomLeft"
            arrow
          >
            <Button
              className="customButton customHeaderButton"
              shape="circle"
              icon={FaRegUser()}
              style={{
                backgroundColor: ThemeData.primary,
                color: "#fff",
                borderWidth: 2,
                borderColor: "#000",
              }}
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
export default CustomTopNavbar;
