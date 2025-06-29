import { Button, Col, Image, Row } from "antd";
import { useState } from "react";
import CustomInput from "../components/UI/Input/customInput";

const LeadSummaryDetails = () => {
  const [leadDetail] = useState({
    name: "Christopher Kata",
    mobile: "+567438879",
    email: "Example@gmail.com",
    home: "1234 Maple Street, Springfield, IL 62701",
    title: "Mr.",
    nationality: "Canadian",
    organization: "TechNova Ltd.",
    jobTitle: "Software Engineer",
    annualRevenue: "$500,000",
    budgetEstimate: "$50,000",
    phoneNumber: "+1-234-567-8901",
    country: "Canada",
    city: "Toronto",
    leadSource: "Website Form",
    industry: "Information Technology",
    interestLevel: "High",
  });
  const GridSize = {
    childrenGridSize: 24,
    inputGridSize: 12,
    titleGridSize: 12,
  };

  return (
    <>
      <Row style={{ width: "100%" }}>
        <Col
          lg={6}
          style={{
            display: "flex",
            height: "170px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            width={150}
            height={150}
            style={{ borderRadius: "15px" }}
            src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"
          />
        </Col>
        <Col
          lg={3}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            height: "160px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button style={{ borderRadius: "20px" }}>Upload New Picture</Button>
            <br />
            <Button style={{ borderRadius: "20px" }}>Delete Picture</Button>
          </div>
        </Col>
      </Row>

      <Row
        gutter={[15, 10]}
        style={{
          padding: "20px",
        }}
      >
        <CustomInput
          labelName="Name"
          name="name"
          inputType="Text"
          isEditable={true}
          errorText={"Name must have some values"}
          value={leadDetail?.name}
          isHorizontalInput={true}
          //   handleOnChange={(value) => {}}
          gridSize={GridSize}
        />
        <CustomInput
          labelName="Mobile"
          name="mobile"
          inputType="Text"
          isEditable={true}
          errorText={"Name must have some values"}
          value={leadDetail?.mobile}
          isHorizontalInput={true}
          //   handleOnChange={(value) => {}}
          gridSize={GridSize}
        />
        <CustomInput
          labelName="Email"
          name="email"
          inputType="Text"
          isEditable={true}
          errorText={"Name must have some values"}
          value={leadDetail?.email}
          isHorizontalInput={true}
          //   handleOnChange={(value) => {}}
          gridSize={GridSize}
        />
        <CustomInput
          labelName="Home"
          name="home"
          isHorizontalInput={true}
          inputType="Text"
          isEditable={true}
          errorText={"Name must have some values"}
          value={leadDetail?.home}
          //   handleOnChange={(value) => {}}
          gridSize={GridSize}
        />
        <CustomInput
          labelName="Title"
          name="title"
          isHorizontalInput={true}
          inputType="Text"
          isEditable={true}
          errorText={"Title must have some values"}
          value={leadDetail?.title}
          //   handleOnChange={(value) => {}}
          gridSize={GridSize}
        />
        <CustomInput
          labelName="Nationality"
          name="natipnality"
          isHorizontalInput={true}
          inputType="Text"
          isEditable={true}
          errorText={"Name must have some values"}
          value={leadDetail?.home}
          //   handleOnChange={(value) => {}}
          gridSize={GridSize}
        />
        <CustomInput
          labelName="Organization"
          name="organization"
          isHorizontalInput={true}
          inputType="Text"
          isEditable={true}
          errorText={"Name must have some values"}
          value={leadDetail?.home}
          //   handleOnChange={(value) => {}}
          gridSize={GridSize}
        />

        <CustomInput
          labelName="Job Title"
          name="jobTitle"
          isHorizontalInput={true}
          inputType="Text"
          isEditable={true}
          errorText={"Name must have some values"}
          value={leadDetail?.home}
          //   handleOnChange={(value) => {}}
          gridSize={GridSize}
        />
        <CustomInput
          labelName="Annual Revenu"
          name="annualRevenue"
          isHorizontalInput={true}
          inputType="Text"
          isEditable={true}
          errorText={"Name must have some values"}
          value={leadDetail?.home}
          //   handleOnChange={(value) => {}}
          gridSize={GridSize}
        />
        <CustomInput
          labelName="Budget Estimate"
          name="budgetEstimate"
          isHorizontalInput={true}
          inputType="Text"
          isEditable={true}
          errorText={"Name must have some values"}
          value={leadDetail?.home}
          //   handleOnChange={(value) => {}}
          gridSize={GridSize}
        />
        {/* {LeadDetailSummaryInfo.map((item, index) => {
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
            })} */}
      </Row>
    </>
  );
};
export default LeadSummaryDetails;
