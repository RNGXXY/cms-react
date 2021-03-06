import React,{Component } from 'react'
import { inject, observer } from 'mobx-react';
import {
  Table, Input, Button, Icon,Empty
} from 'antd';
import Highlighter from 'react-highlight-words';

@inject('store')        // 向该组件中注入store中的数据和方法
@observer               // 订阅store中数据的变化
class SeatsList extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchText: '',
    };
  }

  componentDidMount(){
    this.props.store.onGetCollectionList()
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  render() {
    const columns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: '8%',
      ...this.getColumnSearchProps('index'),
    },{
      title: '收藏ID',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
      ...this.getColumnSearchProps('id'),
    },{
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      width: '20%',
      ...this.getColumnSearchProps('userName'),
    }, {
      title: '电影名称',
      dataIndex: 'movieName',
      key: 'movieName',
      width: '20%',
      ...this.getColumnSearchProps('movieName'),
    },{
      title: '收藏时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
      // width: '20%',
      ...this.getColumnSearchProps('orderTime'),
    }];
    return this.props.store.collectionList.length ? <Table  rowKey="index"  columns={columns} dataSource={this.props.store.collectionList} /> : <Empty/>;
  }
}


export default SeatsList