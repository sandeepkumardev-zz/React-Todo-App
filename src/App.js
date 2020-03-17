import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import "./App.css";
import add from "./add.png";
import del from "./delete.png";

function App() {
  const [title, setTitle] = useState({
    title: ""
  });

  var todolist = [];
  if (localStorage.getItem("todoitem")) {
    todolist = localStorage.getItem("todoitem");
  }

  const [list, setList] = useState(JSON.parse(todolist));

  const onchange = e => {
    setTitle({ [e.target.name]: e.target.value });
  };

  const addhandler = () => {
    const text = title.title;
    if (text === "") {
      alert("Add Some Input ...");
    } else {
      const id = list.length;
      const newtodo = {
        id: id,
        title: text,
        isCompleted: false
      };
      const newlist = [...list];
      newlist.push(newtodo);
      setList(newlist);
      setTitle({ title: "" });
    }
  };

  useEffect(() => {
    localStorage.setItem("todoitem", JSON.stringify(list));
  }, [list]); // update after every list render

  const checkhandler = e => {
    const id = e.target.id;
    const newlist = [...list];
    newlist[id].isCompleted = !newlist[id].isCompleted;
    setList(newlist);
  };

  const delhandler = e => {
    const id = e.target.id;
    const dellist = [...list];
    dellist.splice(id, 1);
    setList(dellist);
  };

  const getstyle = id => {
    return {
      textDecoration: list[id].isCompleted ? "line-through" : "none"
    };
  };

  return (
    <div className="App">
      <Header />
      <div className="input-group my-2">
        <input
          type="text"
          className="form-control mt-1 ml-1"
          placeholder="type here "
          name="title"
          value={title.title}
          onChange={onchange}
        />
        <span>
          <img src={add} alt="add button" onClick={addhandler} />
        </span>
      </div>
      <ul>
        {list.map((item, id) => {
          return (
            <li key={id} className="list">
              <div style={getstyle(id)}>
                <input
                  type="checkbox"
                  className="mx-2"
                  id={id}
                  onChange={checkhandler}
                />
                {item.title}{" "}
                <img
                  className="float-right"
                  src={del}
                  alt="delete"
                  id={id}
                  onClick={delhandler}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
