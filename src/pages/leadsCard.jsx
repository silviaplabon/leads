import { Avatar, Badge, Card, Col, Row, Typography } from 'antd'

import { BackgroundColorObj, GetInitialsAvatar, ParseDate } from '../utils/util'
import { GlobeSvgIcon, MailSvgIcon, PhoneSvgIcon } from '../utils/svgIcons'
import CustomTypography from '../components/UI/customTypography'
import { fakeLeadsData } from '../utils/fakeData'


const LeadCards = () => {
  const groupBy = (array, key) => {
    return array.reduce((result, item) => {
      const groupKey = item[key] || 'Other'
      if (!result[groupKey]) {
        result[groupKey] = []
      }
      result[groupKey].push(item)
      return result
    }, {})
  }
  const groupedData = groupBy(fakeLeadsData, 'typeOfAction')
  const descriptionItems = [
    { icon: PhoneSvgIcon(), keyName: 'mobile' },
    { icon: MailSvgIcon(), keyName: 'email' },
    { icon: GlobeSvgIcon(), keyName: 'purchaseCompanyName' },
  ]


  const getRecentActivityColor = (item, isBg) => {
    let updatedStatus = 'success'
    if (item == 'Fast Response' || item == 'Clicked Email') {
      updatedStatus = 'primary'
    } else if (item == 'Form Submitted' || item === 'Chat Started') {
      updatedStatus = 'success'
    } else {
      updatedStatus = 'warning'
    }
    return isBg
      ? BackgroundColorObj[`${updatedStatus}`][1]
        ? BackgroundColorObj[`${updatedStatus}`][1]
        : BackgroundColorObj[`${updatedStatus}`][0]
          ? BackgroundColorObj[`${updatedStatus}`][0]
          : ''
      : ''
  }
  return (
    <>

          <Row gutter={[10, 10]}>
            {Object.entries(groupedData).map(([actionType, leads]) => (
              <Col lg={6} key={actionType}>
                <div
                  style={{
                    border: '1px solid #000',
                    backgroundColor: '#f3f6f7',
                    padding: '0.5rem 0.7rem',
                    borderRadius: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginLeft: '0.3rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span
                        style={{
                          width: '4px',
                          height: '4px',
                          backgroundColor: '#000',
                          borderRadius: '5px',
                          marginRight: '7px',
                        }}
                      ></span>
                      <CustomTypography
                        fontWeight={'bold'}
                        fontSize={14}
                        textVal={actionType}
                      ></CustomTypography>
                      <Badge count={45} showZero color='#faad14' style={{ marginLeft: '0.5rem' }} />
                    </div>
                    <Typography style={{ fontWeight: 'bold', cursor: 'pointer' }}>...</Typography>
                  </div>
                  {leads?.map((leadItem, index) => (
                    <Card
                      loading={false}
                      style={{
                        Width: 300,
                        marginTop: '0.8rem',
                        boxShadow:
                          'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                      }}
                      key={`${leadItem?.name}-${index}`}
                    >
                      <Card.Meta
                        title={
                          <>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Avatar.Group
                                max={{
                                  count: 2,
                                  style: { color: '#f56a00' },
                                }}
                              >
                                <Avatar>{GetInitialsAvatar(leadItem?.recentActivity)}</Avatar>
                              </Avatar.Group>
                              <div
                                style={{
                                  padding: '0rem 0.5rem',
                                  borderRadius: '0.4rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  height: '22px',
                                  backgroundColor: getRecentActivityColor(
                                    leadItem?.recentActivity,
                                    true,
                                  ),
                                }}
                              >
                                <CustomTypography
                                  textVal={leadItem?.recentActivity}
                                  fontSize={12}
                                  style={{
                                    color: getRecentActivityColor(leadItem?.recentActivity),
                                  }}
                                ></CustomTypography>
                              </div>
                            </div>
                            <CustomTypography
                              textVal={leadItem?.name}
                              fontWeight={600}
                              fontSize={14}
                              style={{ marginTop: '0.5rem' }}
                            ></CustomTypography>
                            <CustomTypography
                              style={{ color: 'gray' }}
                              textVal={ParseDate(leadItem?.createdOn)}
                            ></CustomTypography>
                            <div
                              style={{ border: '1px solid #000', margin: '0.5rem 0rem  0rem 0' }}
                            ></div>
                          </>
                        }
                        description={
                          <>
                            {descriptionItems?.map?.((descriptionItem, index) => (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  marginTop: '0.2rem',
                                }}
                                key={index}
                              >
                                {descriptionItem.icon}
                                <CustomTypography
                                  style={{ marginLeft: '1rem', marginTop: '0rem' }}
                                  textVal={leadItem[`${descriptionItem?.keyName}`] || '-'}
                                  fontSize={13}
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
  )
}


export default LeadCards