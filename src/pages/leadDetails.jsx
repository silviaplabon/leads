/* eslint-disable react/prop-types */
import { Button, Card, Col, Image, Row, Segmented, Typography } from "antd";
import CustomTypography from "../components/UI/customTypography";
import {
  GetInitialsAvatar,
  getRandomTextAvatarColor,
  LeadDetailsInfo,
  ThemeData,
} from "../utils/util";
import CustomLabelAndValueContainer from "../components/UI/Container/customLabelAndValueContainer";
import { useState } from "react";
import CustomInput from "../components/UI/Input/customInput";
import LeadSummaryDetails from "../features/leadSummaryDetails";
import Avatar from "antd/es/avatar/Avatar";
import { ExpandSvgIcon, PhoneIcon, ProfilePlusIcon } from "../utils/svgIcons";
import CustomButton from "../components/UI/CustomButton";

const IconCircle = ({ marginLeft, icon }) => (
  <div
    style={{
      width: 30,
      height: 30,
      backgroundColor: ThemeData.ternary,
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: marginLeft,
    }}
  >
    {icon}
  </div>
);

const LeadDetails = () => {
  const [alignValue, setAlignValue] = useState("Lead Details");
  const [, setNote] = useState("");
  const GridSize = {
    childrenGridSize: 24,
    inputGridSize: 24,
    titleGridSize: 24,
  };
  const [contacts, setContacts] = useState([
    {
      name: "Amina Al-Hassan",
      position: "Marketing Manager",
      lastContacted: "2025-06-09T09:15:00",
      status: "Contacted",
      profilePic: "https://example.com/images/amina.jpg",
    },
    {
      name: "David Miller",
      position: "Product Lead",
      lastContacted: "2025-06-21T14:30:00",
      status: "Requested Info",
      profilePic: "https://example.com/images/david.jpg",
    },
    {
      name: "Jessica Adams",
      position: "Head of Sales",
      lastContacted: "2025-06-10T11:00:00",
      status: "Meeting Scheduled",
      profilePic: "https://example.com/images/jessica.jpg",
    },
    {
      name: "Ali Khan",
      position: "Business Analyst",
      lastContacted: "2025-06-25T16:45:00",
      status: "Not Contacted",
      profilePic: "https://example.com/images/ali.jpg",
    },
    {
      name: "Ali Khan",
      position: "Business Analyst",
      lastContacted: "2025-06-25T16:45:00",
      status: "Not Contacted",
      profilePic: "https://example.com/images/ali.jpg",
    },
    {
      name: "Ali Khan",
      position: "Business Analyst",
      lastContacted: "2025-06-25T16:45:00",
      status: "Not Contacted",
      profilePic: "https://example.com/images/ali.jpg",
    },
    {
      name: "Ali Khan",
      position: "Business Analyst",
      lastContacted: "2025-06-25T16:45:00",
      status: "Not Contacted",
      profilePic: "https://example.com/images/ali.jpg",
    },
  ]);
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
    <div
      style={{
        padding: "0.2rem 0.9rem",
        marginLeft: "0.8rem",
        overflow: "auto",
      }}
    >
      <CustomTypography
        fontSize={20}
        fontWeight={"bold"}
        style={{}}
        textVal={`Lead Summary -Name [ID]`}
      ></CustomTypography>
      <Row gutter={[30, 20]}>
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
          <Row className="tabsContainerLeadDetails">
            <Card
              style={{
                borderRadius: "20px",
                backgroundColor: "#fff",
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
                    key={index}
                    style={{
                      maxWidth: "140px",
                      minWidth: "120px",
                      height: "30px",
                      borderRadius:'20px',
                      padding: "0px",
                      color:alignValue===item?'#fff':"",display:'flex',
                      alignItems:'center',
                      justifyContent:"center",
                      backgroundColor:alignValue===item?ThemeData.primary:""
                    }}
                  >
                    <CustomTypography textVal={item} style={{color:alignValue===item?'#fff':"",}}></CustomTypography>
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
          <Card style={{ backgroundColor: ThemeData.ternary }}>
            <Typography>Quick Contacts</Typography>

            <div style={{ padding: "0.5rem" }}>
              {contacts?.map((item, index) => (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    marginTop: "0.2rem",
                  }}
                  key={index}
                >
                  <div style={{ width: "10%" }}>
                    <IconCircle
                      icon={
                        <Image
                          width={30}
                          height={30}
                          style={{ borderRadius: "15px" }}
                          src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"
                        />
                      }
                    />
                  </div>
                  <div
                    style={{
                      width: "90%",
                      padding: "0.5rem",
                      backgroundColor: "#fff",
                      marginLeft: "0.5rem",
                      boxShadow:
                        "rgba(14, 34, 56, 0.07) 0px 0.1875rem 0.1875rem 0px",
                      borderRadius: "13px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <IconCircle icon={ <Image
                          width={30}
                          height={30}
                          style={{ borderRadius: "15px" }}
                          src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"
                        />} />

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: "0.5rem",
                          }}
                        >
                          <CustomTypography
                            textVal={item?.name}
                            fontSize={12}
                            style={{ lineHeight: 1.2 }}
                          />
                          <CustomTypography
                            textVal="10 Jun"
                            fontSize={11}
                            style={{ lineHeight: 1.2 }}
                          />
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <IconCircle marginLeft={10} icon={PhoneIcon()} />
                        <IconCircle marginLeft={10} icon={ExpandSvgIcon()} />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "1.4rem",
                      }}
                    >
                      <Button
                        style={{
                          padding: "0.4rem 0.6rem",
                          borderRadius: "20px",
                        }}
                      >
                        Jessica Adams
                      </Button>
                      <Button
                        style={{
                          padding: "0.4rem 0.6rem",
                          borderRadius: "20px",
                        }}
                      >
                        Was Assigned
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
