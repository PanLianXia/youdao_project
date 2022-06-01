import React, { Component } from "react";
import withRouter from "./hoc/withRouter";

class ProductDetails extends Component {

  handleSave = () => {
    // Navigate to /products
    this.props.navigate('/products',{replace: true})
  };

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Product Details - {this.props.params.id}</h1>
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

export default withRouter(ProductDetails);
