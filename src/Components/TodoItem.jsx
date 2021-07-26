import React, { useEffect,useState } from 'react';
import alertify from "alertifyjs";

import "alertifyjs/build/css/alertify.css";

const TodoItem=({ id, data, handleDelete })=>{
    const [color,setColor]=useState(false)
    useEffect(()=>{
        let currTime=new Date();
        if(currTime.getTime()<data.time.getTime()){
            check();
            setColor(false);
        }
        else
            setColor(true);
    },[data]);

    const check=()=>{
        setInterval(()=>{
            let now = new Date();
            let checkCondition=Math.round(now.getTime() / 1000) ===
            Math.round(data.time.getTime() / 1000);
    
            if(checkCondition){
                setColor(true);
                alertify.message(data.todoTask).delay(30);
            }
        },1000);
    }
    
    return(
        <div className="todoItem" style={{ background: color ? "#29e807" : "#11f0c7",borderRadius:'20px' }}>
            <p>{data.todoTask}</p>
            <p>{data.time.toLocaleTimeString()}</p>
            <button onClick={() => handleDelete(id)}>Delete</button>
        </div>
    );
}

export default TodoItem;