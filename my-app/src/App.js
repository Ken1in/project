import './App.css';
import React, { useState, useEffect } from 'react';


const storage = [
  {
    currentState: false,
    content: 'eat apple',
    timestamp: "2022-06-30T14:13:35.582Z",
  },
  {
    currentState: false,
    content: 'see text drink water',
    timestamp: "2022-06-30T14:10:45.452Z",
  },
];



function App() {
  const [list, setList] = useState(storage);
  const [remark, setRemark] = useState("");


  const listItems = list.map((item) =>
    <div key={item.timestamp}>
      {(item.currentState === false) ? <input type="checkbox" onClick={()=>updateState(item.timestamp)}></input> : <input type="checkbox" checked onClick={()=>updateState(item.timestamp)}></input>}
      <span>{item.content}</span>
      <span>_________</span>
      <span>{item.timestamp}</span>
      <button onClick={()=>removeRemark(item.timestamp)}>Delete</button>
    </div>
  );

  // update item's state in list
  function updateState(timestamp){
    const newList = list.map((item)=>{
      if (item.timestamp===timestamp){
        const updateItem ={
          ...item,
          currentState: !item.currentState
        };

        return updateItem;
      }
      return item;
    });
      setList(newList);
  }

  // get textarea input
  function updateField(event){
    setRemark(event.target.value)
  }

  // after click submit
  function addNewRemark(){
    const isoDate = new Date().toISOString()
    const newList = list.concat({currentState:false,content: remark, timestamp:isoDate})
    setList(newList);
    setRemark("");
  }

function removeRemark(timestamp){
    const newList = list.filter((item) => item.timestamp !== timestamp);
    setList(newList);
  }

return (
  <div className="App">
    <div className="Display_Section">{listItems}</div>
    <div className="Input_Section">
      <p>Input your todo item</p>
      <input onChange={updateField} value={remark}></input>

      <p>{remark}</p>
      <button type="submit" onClick={addNewRemark}>Submit</button>
    </div>
  </div>
);
}

export default App;
