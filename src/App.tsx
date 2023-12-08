import React from 'react';
import logo from './logo.svg';
import './App.css';
import { type } from 'os';

function App() {
  // union example
  let id:number | string;
  id = 10;
  // Array
  let ids:number [] = [1,2,3,4,5]
  ids.push(1)
  // tuple
  let row:[string,number,boolean] = ["cvf",2,true]
  // tuple array
  let rowArray:[string,boolean,number] [];
  rowArray=[
    ['ags',true,2],
    ['ags',true,2],
    ['ags',true,2],
    ['ags',true,2]
  ]
  // enum
  let e1={
    left:1,
    down:2,
    up:3,
    right:4
  }
  console.log(e1.down)
  // objects
  type User ={
    id:number,
    name:string
  }
  let a:User = {
    id:1,
    name:'ali'
  }
  // type assertion
  let cId:any = "jsejfjkes";
    let customerId1 = cId as number
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {ids}
        </a>
      </header>
    </div>
  );
}

export default App;
