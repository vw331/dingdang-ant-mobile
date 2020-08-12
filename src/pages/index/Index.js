import React from 'react'
import { NavBar, Icon } from 'antd-mobile';

const Index = (props) => {
  return (
    <div className="index-page">
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >15504081910</NavBar>
    </div>
  )
}

export default Index