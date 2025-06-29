import { Card, Col, Row, Segmented, Typography } from "antd";
import CustomTypography from "../components/UI/customTypography";
import { GetInitialsAvatar, getRandomTextAvatarColor, LeadDetailsInfo, ThemeData } from "../utils/util";
import CustomLabelAndValueContainer from "../components/UI/Container/customLabelAndValueContainer";
import { useState } from "react";
import CustomInput from "../components/UI/Input/customInput";
import LeadSummaryDetails from "../features/leadSummaryDetails";
import Avatar from "antd/es/avatar/Avatar";

const LeadDetails = () => {
  const [alignValue, setAlignValue] = useState("Lead Details");
  const [, setNote] = useState("");
  const GridSize = {
    childrenGridSize: 24,
    inputGridSize: 24,
    titleGridSize: 24,
  };

  const [leadDetail] = useState({
    leadStatus: "New",
    leadSource: "Website",
    campaign: "Summer Promo 2025",
    source: "Google Ads",
    leadOwner: "Sasanka",
    isDuplicate: "No",
    createdOn: "2025-06-25",
    createdBy: "Admin User",
    propertyOfInterest: "Beach",
    recentActivity: "Purchased",
  });
  return (
    <div style={{ padding: "1rem", marginLeft: "0.8rem", overflow: "auto" }}>
      <CustomTypography
        fontSize={20}
        fontWeight={"bold"}
        style={{}}
        textVal={`Lead Summary -Name [ID]`}
      ></CustomTypography>
      <Row gutter={[30,20]}>
        <Col lg={16}>
          <Row
            gutter={[15, 10]}
            style={{
              marginTop: "1rem",
              padding: "10px",
              border: "1px solid #dde7ee",
              borderRadius: "13px",
              boxShadow: "0 .1875rem .1875rem 0 #0e223812",
            }}
          >
            {LeadDetailsInfo.map((item, index) => {
              return (
                <CustomLabelAndValueContainer
                  identifier={`${index}-${item?.title}`}
                  key={`${index}-${item?.title}-${item?.value}`}
                  title={item?.title}
                  value={
                    leadDetail[item?.keyName] ? leadDetail[item?.keyName] : "-"
                  }
                  isDetailsItem={true}
                />
              );
            })}
          </Row>
          <Row>
            <Card
              style={{
                borderRadius: "20px",
                backgroundColor: "#fff",
                height: "40px",
                width: "100%",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {[
                  "Lead Details",
                  "Notes",
                  "Activities",
                  "Properties",
                  "Documents",
                ]?.map((item, index) => (
                  <div
                    onClick={() => {
                      setAlignValue(item);
                    }}
                    style={{
                      maxWidth: "140px",
                      minWidth: "120px",
                      padding: "0px 20px",
                    }}
                  >
                    <CustomTypography textVal={item}></CustomTypography>
                  </div>
                ))}
              </div>
            </Card>
          </Row>
          <Row
            style={{
              border: "1px solid #dde7ee",
              borderRadius: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 .1875rem .1875rem 0 #0e223812",
            }}
          >
            {alignValue === "Lead Details" && (
              <LeadSummaryDetails></LeadSummaryDetails>
            )}
            {alignValue === "Notes" && (
              <>
                {" "}
                <CustomInput
                  labelName=""
                  name="notes"
                  inputType="TextArea"
                  minRows={15}
                  maxRows={20}
                  isRequired={false}
                  setValue={setNote}
                  handleOnChange={() => {}}
                  gridSize={GridSize}
                  hideErrorMessageContainer={true}
                />
              </>
            )}
            {alignValue === "Activities" && <></>}
            {alignValue === "Properties" && <></>}
            {alignValue === "Documents" && <></>}
          </Row>
        </Col>
        <Col lg={8}>
        <Card>
          <Typography>Quick Contacts</Typography>
          <div style={{width:"60px",height:'60px',backgroundColor:ThemeData.warmSilk,borderRadius:"50%"}}>
          TEST
          </div>
        </Card>
        </Col>
      </Row>

      {/* <Segmented
        value={alignValue}
        style={{ marginBottom: 8, marginTop: 9 }}
        onChange={setAlignValue}
        options={[
          "Lead Details",
          "Notes",
          "Activities",
          "Properties",
          "Documents",
        ]}
      /> */}
    </div>
  );
};
export default LeadDetails;
