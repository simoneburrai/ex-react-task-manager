import { useState, useRef } from "react";
import { useTaskApi } from "../contexts/ApiContext";

export default function AddTask (){

    const {addTask} = useTaskApi();
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const descriptionRef = useRef(null);
    const statusRef = useRef(null);

    const onSumbit= async(e)=> {
         e.preventDefault();

        const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', ';', ':', "'", '"', ',', '.', '<', '>', '?', '/', '`', '~'];
        const containsSymbol = symbolsArray.some(symbol => title.includes(symbol));

        if(containsSymbol || !title){
            const errorTitle = "Il titolo non è valido, inserire un titolo valido che non contenga caratteri speciali"
            setTitleError(errorTitle);
            return;
        }

        const formData = {
            title: title,
            description: descriptionRef.current.value,
            status: statusRef.current.value
        };
        console.log(formData);

        try {
            await addTask(formData); 
            alert("Task aggiunta con successo!");
            setTitle("");
            descriptionRef.current.value = null
        } catch (error) {
            console.error("Errore durante l'aggiunta della task:", error.message);
            alert(error.message)
        }
        setTitleError("");
    }
    
    return <form onSubmit={onSumbit}>
        <div>
            <label className="form-label" htmlFor="title">Title:</label>
            <input onChange={(e)=>setTitle(e.target.value)} value={title} className="form-control" type="text" name="title" id="title" />
        </div>
        <div>
            <label className="form-label" htmlFor="description">Description: </label>
            <textarea ref={descriptionRef} className="form-control" name="description" id="description"/>
        </div>
        <div>
            <label className="form-label" htmlFor="status">Status:</label>
            <select ref={statusRef} className="form-control" name="status" id="status">
                <option value="To do" >To Do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
            </select>
        </div>
        {titleError && <div className="bg-warning p-3">{titleError}</div>}
        <button  className="btn btn-primary my-3" type="submit">Add Task</button>
    </form>
}
