/* eslint-disable react/prop-types */
import { Divider, Popover, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { FontFamily, ThemeData } from '../../utils/util.jsx'
import { IoArrowBackCircleSharpIcon } from '../../utils/svgIcons'

const CustomBreadcrumb = ({
  children,
  subtitle,
  title,
  item,
  setTypeOfSetup,
  onClick,
  isPrevIconVisible,
  handleButtonClick,
}) => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])
  const redirectToPrevIconLink = () => {
    if (typeof handleButtonClick === 'function') {
      handleButtonClick()
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
        marginTop: '0.75rem',
      }}
    >
      <div
        style={{
          borderRadius: '5px',
          display: 'flex',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isPrevIconVisible && (
            <div
              style={{ cursor: 'pointer', marginRight: '0.5rem' }}
              onClick={redirectToPrevIconLink}
            >
              {IoArrowBackCircleSharpIcon({ color: ThemeData.primary })}
            </div>
          )}

          <Popover
            content={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {item?.map((childItem, index) => (
                  <>
                    <Typography
                      style={{
                        marginBottom: index !== item?.childrens?.length - 1 ? '1px solid gray' : '',
                        cursor: 'pointer',
                        padding: '5px 15px',
                        display: 'flex',
                        alignItems: 'center',
                        borderTopRightRadius: index === 0 ? '8px' : '',
                        borderTopLeftRadius: index === 0 ? '8px' : '',
                        borderBottomRightRadius: index === item?.childrens?.length - 1 ? '8px' : '',
                        borderBottomLeftRadius: index === item?.childrens?.length - 1 ? '8px' : '',
                      }}
                      key={index}
                      className='listItem'
                      onClick={() => {
                        if (typeof setTypeOfSetup === 'function') {
                          setTypeOfSetup(childItem?.elementName)
                        }
                        if (typeof setTypeOfSetup === 'function') {
                          onClick()
                        }
                      }}
                    >
                      {childItem?.icon}{' '}
                      <span style={{ marginLeft: '1rem' }}>{childItem?.elementName}</span>
                    </Typography>
                  </>
                ))}
              </div>
            }
            title=''
            className={item?.childrens?.length > 0 ? 'navButtonPopover' : ''}
            trigger='hover'
          >
            <button
              style={{
                backgroundColor: 'transparent',
                border: '0px',
                padding: '0px',
              }}
            >
              {' '}
              <div
                title={title}
                style={{
                  margin: '0px',
                  font: `normal normal 600 15px ${FontFamily}`,
                  cursor: 'pointer',
                  color: '#000',
                  maxWidth: isMobile ? '100px' : '',
                }}
                className='customTableText'
              >
                {title}
              </div>
            </button>
          </Popover>

          {subtitle && (
            <Divider
              type='vertical'
              style={{
                borderColor: '#000',
                marginLeft: '0.5rem',
                marginTop: '0.2rem',
                width: '2px',
              }}
            ></Divider>
          )}
          <Typography
            title={subtitle}
            className='customTableText'
            style={{
              margin: '0px',
              font: `normal normal 500 12px ${FontFamily}`,
              maxWidth: subtitle
                ? isMobile
                  ? window.innerWidth < 500
                    ? `${(window.innerWidth + 100) / 4}px`
                    : '200px'
                  : '100%'
                : '0px',
              color: '#000',
            }}
          >
            {subtitle ? subtitle : ''}
          </Typography>
        </div>
      </div>
      {children}
    </div>
  )
}

export default CustomBreadcrumb
