/* eslint-disable react/prop-types */
import Dashboard from "./dashboard";
import LeadCards from "./leadsCard";
import CustomTypography from "../components/UI/customTypography";
import CustomButton from "../components/UI/CustomButton";
import { useState } from "react";
import { DashboardSvgIcon, ListSvgIcon } from "../utils/svgIcons";
import CustomAutoComplete from "../components/UI/Input/customAutoComplete";
import { FontFamily, ThemeData } from "../utils/util";

const Home = ({ selectedButton }) => {
  const [pageLoader] = useState(false);
  const [allStatus, setAllStatus] = useState("All Status");
  const [allSources, setAllSources] = useState("All Sources");
  const [sortText, setSortText] = useState("Recently Updated");

  const inputFieldCommonParams = {
    isRequired: false,
    isModalField: false,
    isWithController: false,
    isEditable: false,
  };
  const GridSize = {
    childrenGridSize: 24,
    inputGridSize: 24,
    titleGridSize: 24,
  };

  return (
    <>
      <div
        style={{
          backgroundColor: ThemeData.relaxedBlue,
          padding: "0.2rem 1.5rem 0 1.2rem",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",

            marginBottom: "0.5rem",
          }}
        >
          {" "}
          <CustomTypography
            style={{ font: "normal normal 600 20px StereoGothic" }}
            textVal="Leads"
          ></CustomTypography>
          <div style={{ display: "flex" }}>
            <CustomButton
              title={"Add Lead"}
              showLoader={pageLoader}
              style={{
                backgroundColor: "#fffff",
                color: "#000",
                marginRight: "1rem",
                boxShadow:
                  "0 -1px 5px #ffffffb2,0 1px 5px rgba(94,104,121,.945)",
              }}
              handleButtonClick={() => {
                // downloadReport()
              }}
            ></CustomButton>
            <CustomButton
              title={"Import"}
              showLoader={pageLoader}
              style={{
                backgroundColor: "#fffff",
                color: "#000",
                marginLeft: "",
                boxShadow:
                  "0 -1px 5px #ffffffb2,0 1px 5px rgba(94,104,121,.945)",
              }}
              handleButtonClick={() => {
                // downloadReport()
              }}
            ></CustomButton>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                height: "32px",
                backgroundColor: "#fff",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              <span style={{ marginRight: "0.5rem", fontFamily: FontFamily }}>
                Show As
              </span>{" "}
              <span style={{ marginRight: "0.5rem", fontFamily: FontFamily }}>
                Board{" "}
              </span>{" "}
              {DashboardSvgIcon()} <span style={{ margin: "0 0.5rem" }}>|</span>{" "}
              <span style={{ marginRight: "0.5rem", fontFamily: FontFamily }}>
                List{" "}
              </span>
              {ListSvgIcon()}
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  maxWidth: "140px",
                  minWidth: "120px",
                  margin: "0 0.5rem",
                }}
              >
                <CustomAutoComplete
                  height={32}
                  getLovData={async () => {
                    return {
                      lov: [
                        { label: "All Status", value: "All Status", data: {} },
                      ],
                    };
                  }}
                  handleOnSearch={() => {}}
                  handleSelection={() => {
                    // setSelectedEmployeeDetails(val2?.data)
                    // clearErrors('selectedEmployeeName')
                  }}
                  value={allStatus}
                  codeKey="status"
                  name={"status"}
                  isWithController={false}
                  errorText={``}
                  setValue={setAllStatus}
                  gridSize={{ ...GridSize, inputGridSize: 24 }}
                  {...inputFieldCommonParams}
                ></CustomAutoComplete>
              </div>
              <div
                style={{
                  maxWidth: "140px",
                  minWidth: "120px",
                  margin: "0 0.5rem",
                }}
              >
                <CustomAutoComplete
                  height={32}
                  getLovData={async () => {
                    return {
                      lov: [
                        {
                          label: "All Sources",
                          value: "All Sources",
                          data: {},
                        },
                      ],
                    };
                  }}
                  handleOnSearch={() => {
                    // setSelectedEmployeeDetails()
                  }}
                  handleSelection={() => {
                    // setSelectedEmployeeDetails(val2?.data)
                    // clearErrors('selectedEmployeeName')
                  }}
                  value={allSources}
                  codeKey="sources"
                  name={"sources"}
                  isWithController={false}
                  setValue={setAllSources}
                  gridSize={{ ...GridSize, inputGridSize: 24 }}
                  {...inputFieldCommonParams}
                ></CustomAutoComplete>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                maxWidth: "200px",
                minWidth: "150px",
                margin: "0 ",
              }}
            >
              <CustomAutoComplete
                height={32}
                getLovData={async () => {}}
                handleOnSearch={() => {
                  // setSelectedEmployeeDetails()
                }}
                handleSelection={() => {
                  // setSelectedEmployeeDetails(val2?.data)
                  // clearErrors('selectedEmployeeName')
                }}
                codeKey="sources"
                name={"sources"}
                value={sortText}
                isWithController={false}
                errorText={``}
                setValue={setSortText}
                gridSize={{ ...GridSize, inputGridSize: 24 }}
                {...inputFieldCommonParams}
              ></CustomAutoComplete>
            </div>
          </div>
        </div>
        {selectedButton === "Dashboard" ? (
          <Dashboard></Dashboard>
        ) : (
          <LeadCards></LeadCards>
        )}
      </div>
    </>
  );
};
export default Home;
