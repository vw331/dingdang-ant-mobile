import React from 'react'
import { NavBar, Icon, Tabs, Button } from 'antd-mobile'
import List from './List'

import './index.css'

class OrderList extends React.Component {

  constructor(props)  {
    super(props)
    console.log('contructor')
    this.state = {
      screenHeight: document.documentElement.screenHeight
    }
  }

  componentDidMount() {

  }

  componentWillUpdate() {
  }

  render() {

    const tabs = [
      { title: '全部' },
      { title: '待派单' },
      { title: '进行中' },
      { title: '已完修' },
    ]

    return (
      <div className="order-list-wapper" style={{height: this.state.screenHeight}}>
        <NavBar
          className="order-list-header"
          mode="dark"
        >网易新闻</NavBar>
        <div className="order-list-main">
          <Tabs tabs={tabs}
            initialPage={1}
            onChange={(tab, index) => {  }}
            onTabClick={(tab, index) => {  }}
            prerenderingSiblingsNumber={0}
            style={{overflow: 'auto'}}
          >
            <List style={{overflow: 'auto'}} params={{type: 'all'}}/>
            <List style={{overflow: 'auto'}} params={{type: 'pending'}}/>
            <List style={{overflow: 'auto'}} params={{type: 'doing'}}/>
            <List style={{overflow: 'auto'}} params={{type: 'finish'}}/>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default OrderList