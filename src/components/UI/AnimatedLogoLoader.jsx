/* eslint-disable react/prop-types */
import { DamacAnimatedLogo } from '../../utils/svgIcons'

const AnimatedLogoLoader = ({ active }) => {
  return (
    <>
      {active && (
        <div
          style={{
            display: 'flex',
            height: '80vh',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {DamacAnimatedLogo({ height: '150', width: '150' })}
        </div>
      )}
    </>
  )
}

export default AnimatedLogoLoader;
