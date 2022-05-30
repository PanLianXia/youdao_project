import React, { Component } from 'react';
import widthTooltip from './withTooltip';

const ItemA = ( props ) => {
    return ( 
        <div className='container'>
            <button className='btn btn-primary' type='btn'> Tooltip A </button>
            {props.action.showTooltip && <span className='badge badge-pill badge-primary ml-2'>{props.action.content}</span>}
        </div>
     );
}
 
export default widthTooltip(ItemA);