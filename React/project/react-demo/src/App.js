import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a> */}
      <div class="row header">
        <div class="col-md-12">头部</div>
      </div>
      <div class="row main">
        <div class="col-md-2 sidbar">侧边栏</div>
        <div class="col-md-10 content">内容区</div>
      </div>
      <div class="row fotter">
        <div class="col-md-12">底部</div>
      </div>
      {/* </header> */}
    </div>
  );
}

export default App;
