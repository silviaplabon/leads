/* eslint-disable react/prop-types */
import { Typography } from "antd";
import { FontFamily } from "../../utils/util";

const CustomTypography = ({ textVal, fontSize, fontWeight, style }) => {
  return (
    <Typography
      style={{
        font: `normal normal ${fontWeight || 400} ${fontSize || 11}px ${FontFamily}`,
        ...style,
        fontWeight,
        fontSize,
      }}
    >
      {textVal}
    </Typography>
  );
};
export default CustomTypography;
