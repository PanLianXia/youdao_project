import React, { Component } from "react";
import NavBar from "./components/navbar";
import Products from "./components/products";
import Posts from "./components/posts";
import Home from "./components/home";
import Dashboard from "./components/admin/dashboard";
import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

class App extends Component {
  constructor() {
    super()
    this.state = {
      userRole:''
    }
  }
  handleInput = (e) => {
    this.setState({
      userRole: e.target.value
    })
  }
  render() {
    return (
      <div>
        <NavBar />
        <input onInput={this.handleInput} />
        <div className="container">
          <Routes>
            <Route path="/products" element={<Products groupId="99" />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/posts/:year/:month" element={<Posts />} />
            {this.state.userRole === 'admin' && <Route path="/admin" element={<Dashboard />} />}
            <Route path="/404" element={<NotFound />} />
            <Route path="/mall" element={<Navigate replace to="/products" />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element ={<Navigate replace to="/404" />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
