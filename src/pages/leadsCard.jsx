/* eslint-disable no-debugger */
import { Avatar, Badge, Card, Col, Row, Typography } from "antd";
import {
  FontFamily,
  GetInitialsAvatar,
  getRandomTextAvatarColor,
  getRecentActivityColor,
  ParseDate,
  ThemeData,
} from "../utils/util";
import { GlobeSvgIcon, MailSvgIcon, PhoneSvgIcon } from "../utils/svgIcons";
import CustomTypography from "../components/UI/customTypography";
import { fakeLeadsData } from "../utils/fakeData";
import { useNavigate } from "react-router-dom";

const LeadCards = () => {
  const navigate=useNavigate()
  const groupBy = (array, key) => {
    return array.reduce((result, item) => {
      const groupKey = item[key] || "Other";
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {});
  };
  const groupedData = groupBy(fakeLeadsData, "stage");
  const descriptionItems = [
    { icon: PhoneSvgIcon(), keyName: "mobile" },
    { icon: MailSvgIcon(), keyName: "email" },
    { icon: GlobeSvgIcon(), keyName: "purchaseCompanyName" },
  ];

  return (
    <>
      <Row gutter={[10, 10]} style={{borderRadius:"0.5"}}>
        {Object.entries(groupedData).map(([actionType, leads]) => (
          <Col lg={6} key={actionType}>
            <div
              style={{
                backgroundColor: ThemeData.warmSilk,
                padding: "0.5rem 0.3rem",
                borderRadius: "0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "0.3rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    maxWidth: "85%",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      backgroundColor:getRecentActivityColor(actionType)||"#000",
                      borderRadius: "5px",
                      marginRight: "7px",
                    }}
                  ></span>
                  <CustomTypography
                    fontWeight={"bold"}
                    fontSize={13}
                    textVal={actionType}
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  ></CustomTypography>
                  <Badge
                    count={45}
                    showZero
                    color="#000"
                    style={{ marginLeft: "0.5rem" ,backgroundColor:ThemeData.primary}}
                  />
                </div>
                <Typography style={{ fontWeight: "bold", cursor: "pointer" }}>
                  ...
                </Typography>
              </div>
              {leads?.map((leadItem, index) => (
                <Card
                  loading={false}
                  style={{
                    Width: 300,
                    padding: "0.25rem",
                    marginTop: "0.3rem",
                  }}
                  key={`${leadItem?.name}-${index}`}
                  onClick={()=>navigate('/leads/1')}
                >
                  <Card.Meta
                    title={
                      <>
                        <div
                          style={{
                            display: "flex",
                            marginTop: "0.5rem",
                            justifyContent: "space-between",
                          }}
                        >
                          <Avatar.Group
                            max={{
                              count: 2,
                              style: { color: "#f56a00" },
                            }}
                          >
                            <Avatar
                              style={{
                                font:`normal normal 600 12px ${FontFamily}`,
                                backgroundColor: getRandomTextAvatarColor(),
                              }}
                            >
                              {GetInitialsAvatar(leadItem?.name)}
                            </Avatar>
                          </Avatar.Group>
                          <div
                            style={{
                              padding: "0rem 0.5rem",
                              borderRadius: "0.4rem",
                              display: "flex",
                              alignItems: "center",
                              height: "22px",
                              backgroundColor: getRecentActivityColor(
                                leadItem?.leadStatus,
                                true
                              ),
                            }}
                          >
                            <CustomTypography
                              fontSize={11}
                              textVal={`${leadItem?.leadStatus}`}
                              style={{
                                color: getRecentActivityColor(leadItem?.leadStatus),
                              }}
                            ></CustomTypography>
                          </div>
                        </div>
                        <CustomTypography
                          textVal={leadItem?.name}
                          fontWeight={700}
                          fontSize={13}
                          style={{ marginTop: "0.3rem" }}
                        ></CustomTypography>
                        <CustomTypography
                          fontSize={11}
                          fontWeight={400}
                          style={{ color: "gray" }}
                          textVal={ParseDate(leadItem?.createdOn)}
                        ></CustomTypography>
                        <div
                          style={{
                            border: "1px solid #000",
                            margin: "0.5rem 0rem  0rem 0",
                          }}
                        ></div>
                      </>
                    }
                    description={
                      <>
                        {descriptionItems?.map?.((descriptionItem, index) => (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: "0.2rem",
                            }}
                            key={index}
                          >
                            {descriptionItem.icon}
                            <CustomTypography
                              fontWeight={400}
                              style={{ marginLeft: "1rem", marginTop: "0rem" }}
                              textVal={
                                leadItem[`${descriptionItem?.keyName}`] || "-"
                              }
                              fontSize={11}
                            ></CustomTypography>
                          </div>
                        ))}
                      </>
                    }
                  />
                </Card>
              ))}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default LeadCards;
