import React from 'react';

const Navbar = ({total, onReset, sum}) => {
  console.log('Nav - rendering')
  return ( 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="wrap">
      <span className="title">NAVBAR</span>
      <span className="badge badge-pill badge-primary ml-2 mr-2">{total}</span>
      <span className="badge badge-pill badge-primary ml-2 mr-2">{sum}</span>
      <button onClick={onReset} className="btn btn-outline-success my-2 my-sm-0 fr" type="button">Reset</button>
    </div>
  </nav>
   );
}
 
export default Navbar;

// class Nav extends PureComponent {
  
//   render() { 
//     return ( 
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="wrap">
//           <span className="title">NAVBAR</span>
//           <span className="badge badge-pill badge-primary ml-2 mr-2">{this.props.total}</span>
//           <button onClick={this.props.onReset} className="btn btn-outline-success my-2 my-sm-0 fr" type="button">Reset</button>
//         </div>
//       </nav>
//     );
//   }
// }
 
// export default Nav;