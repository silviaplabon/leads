/* eslint-disable react/prop-types */
import { Col, Row, Skeleton } from 'antd'

const SkeletonContainer = ({ count, skeletonType }) => {
  return (
    <div style={{ padding: '11px 25px', width: '100%' }}>
      {Array.from({ length: count }).map((_, index) => {
        return skeletonType ? (
          <Row style={{ marginTop: '0.5rem' }}>
            <Col xs={3}>
              <Skeleton.Avatar active size={'large'} shape={'circle'} />
            </Col>
            <Col xs={21}>
              <Row gutter={[10, 20]} style={{ width: '100%' }}>
                <Col xs={12}>
                  {' '}
                  <Skeleton.Button key={index} active size='large' shape='square' block />
                </Col>
                <Col xs={12}>
                  {' '}
                  <Skeleton.Button key={index} active size='large' shape='square' block />
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Skeleton.Button
            key={index}
            active
            size='large'
            shape='square'
            block
            style={{ marginTop: '0.5rem' }}
          />
        )
      })}
    </div>
  )
}
export default SkeletonContainer
