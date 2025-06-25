/* eslint-disable react/prop-types */
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Loader = ({ loaderType }) => {
  return (
    <>
      {loaderType === 'button' ? (
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 13,
                color: '#000',
              }}
              spin
            />
          }
          size='small'
        />
      ) : (
        <div
          className='loaderContainer'
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 35,
                  color: '#000',
                }}
                spin
              />
            }
            size='large'
            style={{ height: '60px', width: '60px' }}
          />
        </div>
      )}
    </>
  )
}
export default Loader
