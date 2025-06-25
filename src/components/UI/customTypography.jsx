
/* eslint-disable react/prop-types */
import { Typography } from 'antd'


const CustomTypography = ({ textVal, fontSize, fontWeight,style }) => {
  return (
    <Typography
      style={{ font: `normal normal ${fontWeight || 400} ${fontSize || 12}px HankenGrotesk`,...style }}
    >
      {textVal}
    </Typography>
  )
}
export default CustomTypography
