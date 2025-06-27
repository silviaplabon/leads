/* eslint-disable no-debugger */
import { Avatar, Badge, Card, Col, Row, Typography } from "antd";
import {
  GetInitialsAvatar,
  getRandomTextAvatarColor,
  getRecentActivityColor,
  ParseDate,
} from "../utils/util";
import { GlobeSvgIcon, MailSvgIcon, PhoneSvgIcon } from "../utils/svgIcons";
import CustomTypography from "../components/UI/customTypography";
import { fakeLeadsData } from "../utils/fakeData";

const LeadCards = () => {
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
      <Row gutter={[10, 10]}>
        {Object.entries(groupedData).map(([actionType, leads]) => (
          <Col lg={6} key={actionType}>
            <div
              style={{
                backgroundColor: "#f3f5f7",
                padding: "0.5rem 0.7rem",
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
                      width: "4px",
                      height: "4px",
                      backgroundColor: "#000",
                      borderRadius: "5px",
                      marginRight: "7px",
                    }}
                  ></span>
                  <CustomTypography
                    fontWeight={"bold"}
                    fontSize={12}
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
                    color="#faad14"
                    style={{ marginLeft: "0.5rem" }}
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
                          fontSize={12}
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
