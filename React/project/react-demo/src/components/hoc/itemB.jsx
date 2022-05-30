import React, { Component } from 'react';
import widthTooltip from './withTooltip';

const ItemB = ( props ) => {
    return ( 
        <div className='container'>
            <button className='btn btn-danger' type='btn'> Tooltip B </button>
            {props.action.showTooltip && <span className='badge badge-pill badge-primary ml-2'>{props.action.content}</span>}
        </div>
     );
}
 
export default widthTooltip(ItemB);