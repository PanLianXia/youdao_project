import React, { PureComponent } from 'react';
import ListItem from './listItem';

class ListPage extends PureComponent {
    renderList() {
        // if(listData.length === 0) {
        //   return <div className='text-center'>购物车是空的</div>
        // }
        return this.props.data.map((item, index) => {
          return <ListItem 
                  hasBg={index%2===0}  
                  key={item.id} 
                  data={item} 
                  onDelete={this.props.handleDelete} 
                  onIncrease={this.props.handleIncrease} 
                  onDecrease={this.props.handleDecrease} />
        })
    }
    render() { 
        console.log('Page - rendering')
        return (
            <div className="container">
                {this.props.data.length === 0 && <div className='text-center'>购物车是空的</div>}
                {this.renderList()}
            </div>
        );
    }
}
 
export default ListPage;