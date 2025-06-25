import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const items = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: 'Dashboard',
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: 'Lead',
  },
]
const getLevelKeys = (items1) => {
  const key = {}
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level
      }
      if (item.children) {
        func(item.children, level + 1)
      }
    })
  }
  func(items1)
  return key
}
const levelKeys = getLevelKeys(items)

const CustomSidebar = () => {
  const navigate = useNavigate()
  const [stateOpenKeys, setStateOpenKeys] = useState(['2'])
  const onOpenChange = (openKeys) => {
    navigate('/leads')
  }
  return (
    <>
      <Menu
        mode='inline'
        defaultSelectedKeys={['2']}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{ width: 256 }}
        items={items}
      />
    </>
  )
}
export default CustomSidebar
