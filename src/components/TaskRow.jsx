import { memo } from "react";
import { Link } from "react-router-dom";

export default memo(function TaskRow ({task}){
    const {status, createdAt, title, id} = task;
    const dateObject = new Date(createdAt);
    const formattedDate = dateObject.toLocaleDateString('it-IT');

    const todoColor = "bg-danger";
    const doingColor = "bg-warning";
    const doneColor = "bg-success";

    let currentColor = "";
    if(status === "To do"){
        currentColor = todoColor;
    }else if(status === "Doing"){
        currentColor = doingColor;
    }else if(status === "Done"){
        currentColor = doneColor;
    }

    return <tr className="row "> 
        <td className={`col text-light ${currentColor}`}><Link task = {task} className="text-decoration-none text-white" to={`/tasks/${id}`}>{title}</Link></td>
        <td className={`col text-light ${currentColor}`}>{status}</td>
        <td className={`col text-light ${currentColor}`}>{formattedDate}</td>
    </tr>
})