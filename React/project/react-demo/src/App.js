import React, { Component } from 'react';
import './App.css';
import ListPage from './components/listPage';
import Navbar from "./components/navbar";
import ItemA from './components/hoc/itemA'
import ItemB from './components/hoc/itemB'
import ItemC from './components/rp/itemC';


class APP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listData: [
        {
          id: 1,
          name: 'Sony 65寸高清液晶电视',
          price: 4000,
          stock: 10,
          value: 4  //购物车数量
        },
        {
          id: 2,
          name: '华为 Meta30',
          price: 6000,
          stock: 100,
          value: 2
        },
        {
          id: 3,
          name: '华硕 玩家国度笔记本',
          price: 10000,
          stock: 11,
          value: 1
        }
      ]
    }
    console.log('App-construstor')
  }

  componentDidMount() {
    console.log('111App-mounted')
  }

  handleDelete = (id) => {
    const listData = this.state.listData.filter(item => item.id !== id)
    this.setState({
      listData
    })
  }

  handleDecrease = (id) => {
    const _data = this.state.listData.map(item => {
      if(item.id === id) {
        const _item = {...item}
        if(_item.value > 0) _item.value --
        return _item
      } else {
        return item
      }
    })
    this.setState({
      listData: _data
    })
  }

  handleIncrease = (id) => {
    const _data = this.state.listData.map(item => {
      if(item.id === id) {
        const _item = {...item}
        _item.value ++
        return _item
      } else {
        return item
      }
    })
    this.setState({
      listData: _data
    })
  }

  handleReset = () => {
    const _list = this.state.listData.map(item => {
      const _item = {...item}
      _item.value = 0
      return _item
    })
    this.setState({
      listData: _list
    })
  }
  handleSum = () => {
    return this.state.listData.reduce((per, current) => {
      return per + current.value
    },0)
  }
  render() { 
    console.log('App-rendering')
    return (
      <>
        <Navbar onReset={this.handleReset} total={this.state.listData.length} sum={this.handleSum()} />
        <ListPage 
          data={this.state.listData}
          handleDecrease={this.handleDecrease}
          handleIncrease={this.handleIncrease}
          handleDelete={this.handleDelete} />
        <ItemA id="11" />
        <ItemB />
        <ItemC />
      </>
    );
  }
}
 
export default APP;

