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
              collapsible={false}
              collapsed={collapsed}
              style={{ backgroundColor: ThemeData.secondary }}
              onCollapse={(value) => setCollapsed(value)}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <CustomTypography
                  style={{
                    font: "normal normal 900 20px StereoGothic",
                    color: "#000",
                    display: "flex",
                    height: "60px",
                    padding: "0rem 0.2rem 0 1.5rem",
                    alignItems: "center",
                  }}
                  fontSize={20}
                  textVal={"JAD GLOBAL"}
                ></CustomTypography>
                <img src='data:image/png;base64,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'/>
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
                          backgroundColor: "#fff",
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
