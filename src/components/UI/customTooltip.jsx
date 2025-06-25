/* eslint-disable react/prop-types */
import { Tooltip } from 'antd'
import { FontFamily, ThemeData } from '../../utils/util.jsx'

const CustomTooltip = ({ title, children, placement }) => {
  return (
    <>
      {title && title !== '' ? (
        <Tooltip
          title={<div style={{ font: `normal normal 400 12px ${FontFamily}` }}>{title}</div>}
          color={ThemeData.primary}
          placement={placement}
          key={title}
        >
          {children}
        </Tooltip>
      ) : (
        <div>{children}</div>
      )}
    </>
  )
}

export default CustomTooltip
