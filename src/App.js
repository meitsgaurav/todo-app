import React, { useEffect, useState } from "react";
import Datetime from "react-datetime";
import TodoItem from "./Components/TodoItem";
import Clock from "./Components/clock"
import alertify from "alertifyjs";

import "alertifyjs/build/css/alertify.css";

import "./App.css";
import "react-datetime/css/react-datetime.css";

const App = () => {
  const [todoTask, setTodoTask] = useState("");
  const [time, setTime] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("todoList");

    let date = new Date();
    date.setHours(0, 0, 0);
    setTime(date);

    if (!data)
      return;
    data = JSON.parse(data);

    let final = data.map((item) => {
      let time = new Date(item.time);
      item.time = time;
      return item;
    });
    setList(final);
  }, []);

  const handleSubmit = () => {
    if (!todoTask || !time) {
      alertify.message("Please Enter a Task").delay(3);
      return false;
    }

    let data = { todoTask, time };
    let temp = [...list, data];
    setList(temp);
    setTodoTask("");

    let date = new Date();
    date.setHours(0, 0, 0);

    setTime(date);
    localStorage.setItem("todoList", JSON.stringify(temp));
  }

  const handleDelete = (id) => {
    let data = list.filter((item, key) => key !== id);
    setList(data);

    localStorage.setItem("todoList", JSON.stringify(data));
  }
  return (
    <div className="App">
      {/* <Clock /> */}
      <div className="content">
        <div className="addNew">
          {/* Input Text start here */}
          <input
            type="text"
            className="form-control"
            value={todoTask}
            placeholder="Enter Task"
            onChange={({ target }) => setTodoTask(target.value)}
          />
          {/* Input text ends here */}

          {/* Time box starts here */}
          <Datetime
            value={time}
            onChange={(val) => {
              setTime(val._d);
            }}
            timeFormat="hh:mm:ss a"
            dateFormat={false}
          />
          {/* Time box ends here */}

          {/* Button starts here */}
          <button onClick={handleSubmit}>
            Add New Task
          </button>
          {/* Button ends here */}
        </div>
        <div>
          {list.map((item, key) => {
            return (
              <TodoItem
                key={key}
                id={key}
                data={item}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}
export default App;