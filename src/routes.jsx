/* eslint-disable react-hooks/exhaustive-deps */
import "@ant-design/v5-patch-for-react-19";
import { useState, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import DamacLoader from "./components/UI/AnimatedLogoLoader.jsx";
import AntResult from "./components/UI/AntResult.jsx";
import CustomSidebar from "./components/UI/customSidebar.jsx";
import Home from "./pages/home.jsx";
import CustomTopNavbar from "./components/UI/customTopNavbar.jsx";
import { Content } from "antd/es/layout/layout.js";
import Sider from "antd/es/layout/Sider.js";
import CustomTypography from "./components/UI/customTypography.jsx";
import LeadDetails from "./pages/leadDetails.jsx";
import { ThemeData } from "./utils/util.jsx";

const LoaderFallback = () => (
  <DamacLoader width={150} height={150} active={true} />
);

const Routers = () => {
  const [loader] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
          <Layout>
            <Sider
              collapsible
              collapsed={collapsed}
              style={{ backgroundColor: ThemeData.secondary }}
              onCollapse={(value) => setCollapsed(value)}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <CustomTypography
                  style={{
                    font: "normal normal 600 20px StereoGothic",
                    color: "#fff",
                    display: "flex",
                    height: "60px",
                    padding: "0rem 0.2rem 0 1.5rem",
                    alignItems: "center",
                  }}
                  textVal={"JAD GLOBAL"}
                ></CustomTypography>
                <CustomSidebar></CustomSidebar>
              </div>
            </Sider>

            <Content>
              {" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <CustomTopNavbar></CustomTopNavbar>
                {!loader ? (
                  <>
                    <Suspense fallback={<LoaderFallback />}>
                      <div
                        className="bodyContainer"
                        style={{
                          height: "98vh",
                          width: "100%",
                       
                          backgroundColor: ThemeData.relaxedBlue,
                          overflow: "auto",
                        }}
                      >
                        <Routes>
                          <Route
                            exact
                            path="/"
                            element={<Home selectedButton={"Dashboard"} />}
                          />
                          <Route
                            exact
                            path="/leads"
                            element={<Home selectedButton={"Leads"} />}
                          />
                          <Route
                            exact
                            path="/leads/:id"
                            element={<LeadDetails />}
                          />
                        </Routes>
                      </div>
                    </Suspense>
                  </>
                ) : loader ? (
                  <Routes>
                    <Route
                      path=""
                      element={
                        !loader && (
                          <AntResult
                            typeOfResult="unauthorized"
                            onClick={() => window.location.reload()}
                            redirectTitle="Retry"
                          ></AntResult>
                        )
                      }
                    />
                  </Routes>
                ) : (
                  <div style={{ height: "90vh", backgroundColor: "#fff" }}>
                    <DamacLoader width={150} height={150} active={true} />
                  </div>
                )}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Routers;
