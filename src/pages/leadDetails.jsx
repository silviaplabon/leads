import { Row, Segmented } from "antd";
import CustomTypography from "../components/UI/customTypography";
import { LeadDetailsInfo } from "../utils/util";
import CustomLabelAndValueContainer from "../components/UI/Container/customLabelAndValueContainer";
import { useState } from "react";
import CustomInput from "../components/UI/Input/customInput";
import LeadSummaryDetails from "../features/leadSummaryDetails";

const LeadDetails = () => {
  const [alignValue, setAlignValue] = useState("");
  const [note, setNote] = useState("");
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

      <Segmented
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
      />
      <div
        style={{
          border: "1px solid #dde7ee",
          borderRadius: "13px",
          backgroundColor: "#f1f7f9",

          boxShadow: "0 .1875rem .1875rem 0 #0e223812",
        }}
      >
        {alignValue === "Lead Details" && (
          <LeadSummaryDetails></LeadSummaryDetails>
        )}
        {alignValue === "Notes" && (
          <>
            {" "}
            <Row gutter={[10, 2]} style={{ width: "100%", padding: "0.5rem" }}>
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
            </Row>
          </>
        )}
        {alignValue === "Activities" && <></>}
        {alignValue === "Properties" && <></>}
        {alignValue === "Documents" && <></>}
      </div>
    </div>
  );
};
export default LeadDetails;
