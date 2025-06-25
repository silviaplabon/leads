/* eslint-disable react/prop-types */

import { Button } from 'antd'
import { useEffect, useState } from 'react'
import CustomTooltip from './customTooltip.jsx'
import { ThemeData } from '../../utils/util.jsx'

const CustomButton = ({
  title,
  handleButtonClick,
  style,
  icon,
  isSelectedButton,
  isBreadcrumbBtn,
  buttonType,
  showLoader = false,
  disabled,
}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])
  return (
    <CustomTooltip title={isBreadcrumbBtn && isMobile ? title : ''}>
      <Button
        htmlType={buttonType ? buttonType : 'button'}
        loading={showLoader}
        disabled={showLoader || disabled}
        aria-label={`Button-${title}`}
        style={{
          ...style,

          '&:hover': {
            backgroundColor: style?.backgroundColor ? style.backgroundColor : ThemeData.primary,
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
            backgroundColor: style?.backgroundColor ? style.backgroundColor : ThemeData.secondary,
          },
        }}
        className={`submitBtn ${
          isBreadcrumbBtn && isMobile ? 'breadcrumbBtnMobile ' : ''
        } ${isSelectedButton ? 'selectedButton' : ''} ${
          style?.backgroundColor ? 'submitBtnBg' : ''
        }`}
        onClick={() => handleButtonClick()}
      >
        {icon && <span style={{ marginRight: '1px' }}>{icon}</span>}
        <span style={{}}>{title}</span>
      </Button>
    </CustomTooltip>
  )
}

export default CustomButton
