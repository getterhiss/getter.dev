import React, { memo } from "react"
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = (props: SvgProps) => (
  <Svg
    height={24}
    viewBox="0 0 24 24"
    width={24}
    fill="#FFF"
    {...props}
  >
    <Path d="M0 0h24v24H0V0z" fill="none" />
    <Path d="M20 2h-8C6.38 2 2 6.66 2 12.28 2 17.5 6.49 22 11.72 22 17.39 22 22 17.62 22 12V4c0-1.1-.9-2-2-2zm-3 13-3-2v2H7V9h7v2l3-2v6z" />
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo
