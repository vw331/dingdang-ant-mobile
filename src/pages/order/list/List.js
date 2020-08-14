import React from 'react'
import { render } from '@testing-library/react'
import { withRouter } from 'react-router-dom';
import { ListView, PullToRefresh } from 'antd-mobile' 
import Qs from 'qs'
import $http from '../../../request'

class List extends React.Component {

  constructor(props) {
    
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.dateCache = []
    this.state = {
      dataSource,
      isLoading: true,
      isDone: false,
      refreshing: false,
      pageNum: 1,
      height: document.documentElement.clientHeight - 113
    }
  }

  componentDidMount() {
    const self = this
    this.loadData()
  }

  
  loadData() {

    $http.post('https://api.apiopen.top/getWangYiNews',  Qs.stringify({ count: 20, page: this.state.pageNum }))
      .then(res => {
       
        const { result, code } = res.data
        this.dateCache = [ ...this.dateCache, ...result]
        this.setState({
          isLoading: false,
          refreshing: false,
          dataSource: this.state.dataSource.cloneWithRows(this.dateCache)
        })
        
      })
  }


  // 滑动到底部时加载更多
  onEndReached = () => {
    if( this.state.isDone || this.state.isLoading ) {
      return 
    }
    this.setState({
      pageNum: this.state.pageNum + 1
    }, () => {
      this.loadData()  
    })

  }

  // 上拉刷新
  onRefresh = () => {
    this.dateCache = []
    this.setState({
      refreshing: true,
      isLoading: true,
      pageNo: 1 // 刷新嘛，一般加载第一页，或者按你自己的逻辑（比如每次刷新，换一个随机页码）
    }, ()=>{
      this.loadData()
    })
  }

  onItemClick(record) {
    console.log(record)
    this.props.history.push('/view')
  }

  render() {

    const row = (rowData, sectionID, rowID) => {
      return (
        <div className="list-item-wrap" key={rowID} onClick={this.onItemClick.bind(this, rowData)}>
          <div className="list-item-media">
            <img src={rowData.image} alt={rowData.title}/>
          </div>
          <div className="list-item-body">
            <h3 className="list-item-title">{rowData.title}</h3>
            <p className="list-item-des">{rowData.passtime}</p>
          </div>
        </div>
      )
    }
    return (
      <div ref={el => this.wrapRef = el}>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderRow={row}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          initialListSize={20}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          pullToRefresh={<PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          onEndReachedThreshold={20}
          onEndReached={this.onEndReached}
          pageSize={5}
        >
        </ListView>
      </div>
    )
  }
  
}

export default withRouter(List)