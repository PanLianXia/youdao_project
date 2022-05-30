import React, { Component } from 'react';
import './qipan.css'

class Qipan extends Component {
    
    createDoms() {
        let qipanList = []
        for(let i = 0; i < 12; i++) {
            let rowDom = []
            for(let j = 0; j < 12; j++) {
                rowDom.push(<div className={`qipan-item ${(i+j)%2 === 0 ? 'white' : 'blank'}`} key={i+'-'+j}></div>)
            }
            qipanList.push(<div style={{display: 'flex'}} key={i}>{rowDom}</div>)
        }
        return qipanList
    }
    render() { 
        return (
            <>
            {this.createDoms()}
            </>
        );
    }
}
 
export default Qipan;