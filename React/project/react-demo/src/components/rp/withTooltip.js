import React from "react";
class WithTooltip extends React.Component {
    state = {
        showTooltip: false,
        content: ''
    }
    handleOver = (ev) => this.setState({
        showTooltip: true,
        content: ev.target.innerText
    })
    handleOut = () => this.setState({
        showTooltip: false,
        content: ''
    })
    render() {
        return (
            <div onMouseOver={this.handleOver} onMouseOut={this.handleOut}>
                {this.props.children(this.state)}
            </div>
        )
    }
}
 
export default WithTooltip;