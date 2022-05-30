import React, { PureComponent } from 'react';
// import './listItem.css'
import style from './listItem.module.css'
import classnames from 'classnames/bind'

const cls = classnames.bind(style)


class ListItem extends PureComponent {
    // constructor( props ) {
    //     // js强制规定子类构造函数先调用一次super函数
    //     super(props)
    //     this.state = {
    //         count: this.props.data.value
    //     }
    // }

    componentDidUpdate(nextProps) {
        if(nextProps.data.value !== this.props.data.value) {
            console.log('Item - Updated')
        }
    }
    componentWillUnmount() {
        console.log('Item - Delete')
    }

    /**
     * render方法执行前
     */
    // shouldComponentUpdate (nextProps, nextState) {
    //     console.log('props', this.props, nextProps)
    //     console.log('state', this.state, nextState)
    //     if(this.props.id === nextProps.id) return false
    //     return true
    // }

    render() { 
        console.log('Item - rendering')
        return (
            <div className="row mb-3">
                <div className="col-4 themed-grid-col"><span className={cls('title')}>{this.props.data.name}</span></div>
                <div className="col-1 themed-grid-col"><span className={cls('price-tag')}>¥{this.props.data.price}</span></div>
                <div className={`col-2 themed-grid-col${this.props.data.value ? '' : '-s'}`} >
                    <button onClick={() => {this.props.onDecrease(this.props.data.id)}} type="button" className="btn btn-primary"> - </button>
                    <span className={cls('digital')}>{this.props.data.value}</span>
                    <button onClick={() => {this.props.onIncrease(this.props.data.id)}} type="button" className="btn btn-primary"> + </button>
                </div>
                <div className="col-2 themed-grid-col">￥ {this.props.data.price * this.props.data.value}</div>
                <div className="col-1 themed-grid-col">
                    <button onClick={() => {this.props.onDelete(this.props.data.id)}} className='btn btn-danger btn-sm'>删除</button>
                </div>
            </div>
        );
    }
}
 
export default ListItem;