import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends Component {
  state = {
    todo: "",
    todolist: [],
    checkboxid: []
  };
  onChanger = e => {
    e.preventDefault();
    console.log("e.target.value", e.target.value);
    if (e.target.value.length === 0) return;
    else
      this.setState({
        todo: e.target.value
      });
  };
  addHandler = e => {
    e.preventDefault();
    let toco = [...this.state.todolist];
    toco.push({ name: this.state.todo, id: Math.random() });
    this.setState({
      todolist: toco
    });
  };
  sendId = id => {
    let checkboxid = [...this.state.checkboxid];
    checkboxid.push(id);
    this.setState({
      checkboxid
    });
  };

  deleteHandler = e => {
    e.preventDefault();
    const checkboxid = [...this.state.checkboxid];
    let todolist = [...this.state.todolist];
    let todolist1 = [];
    for (let i of checkboxid) {
      todolist1 = todolist.filter(td => td.id !== i);
      todolist = todolist1;
    }
    this.setState({ todolist: todolist1 });
  };
  dleteSingle = id => {
    const todolist = [...this.state.todolist];
    todolist.splice(id, 1);
    this.setState({ todolist });
  };
  sorter = () => {
    const todolist = [...this.state.todolist];
    todolist.sort((a, b) => {
      const x = a.name.toString().toLowerCase();
      const y = b.name.toString().toLowerCase();
      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    });
    this.setState({
      todolist
    });
  };
  render() {
    console.log("check id", this.state.checkboxid);
    return (
      <div className="App">
        <button onClick={this.sorter}>Sort</button>
        <button onClick={this.deleteHandler}>delete multiple</button>
        <br />
        <hr />
        <input type="text" onChange={this.onChanger} />
        <button onClick={this.addHandler}>todo</button>
        {this.state.todolist.map((td, id) => (
          <ol key={td.id}>
            <input type="checkbox" onClick={this.sendId.bind(this, td.id)} />
            {`${td.name}   `} {"   "}{" "}
            <span onClick={this.dleteSingle.bind(this, id)}>X</span>
          </ol>
        ))}
      </div>
    );
  }
}
export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
