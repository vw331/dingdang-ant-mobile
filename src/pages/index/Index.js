import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import { Route, Switch, Link } from 'react-router-dom'  
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import OrderList from '../order/list'
import OrderView from '../order/view'

const Index = (props) => {
  return (
    <div className="index-page">
      <CacheSwitch>
        <CacheRoute path="/" exact component={OrderList}></CacheRoute>
        <Route path="/add" exact render={() => <div>add</div>}></Route>
        <Route path="/view" exact component={OrderView}></Route>
      </CacheSwitch>
    </div>
  )
}

export default Index