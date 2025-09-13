import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { useTaskApi } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";

export default function TaskDetail(){

    const navigate = useNavigate();
        let {id} = useParams()
    id = parseInt(id);

    const {removeTask} = useTaskApi()

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("");

    const fetchTask = async()=>{
        try {
            setLoading(true)
            const response = await fetch(`http://localhost:3001/tasks/`);
            const data = await response.json()
            if(response.ok){
                const currentTask = data.find(task=> task.id === id);
                console.log("Task: ", currentTask);
                currentTask && setTask(currentTask);
            }else{
                const error= `Errore nella richiesta della task`
                throw new Error(error);
            }
        } catch (error) {
            console.log(error);
            setError(error);
        }finally{
            setLoading(false)
        }
    }

    const handleDelete = async () => {
    try {
      await removeTask(id);
      alert("Task eliminata con successo!");
      navigate(-1)
    } catch (err) {
      alert(`Errore durante l'eliminazione: ${err.message}`);
    }
  };

    useEffect(()=>{
        fetchTask();
    }, [id])

    return <>
        {error && <div className="bg-danger text-white p-5">{error}</div>}
        {loading && <div className="bg-danger text-white p-5">Caricamento in corso</div>}
        {(task && !error) && <div>
        <div><strong>Nome: {task.title}</strong> </div>
        <div><strong>Descrizione: {task.description}</strong></div>
        <div><strong>Stato: {task.status}</strong></div>
        <div><strong>Data di Creazione: {task.createdAt} </strong></div>
        <button onClick={handleDelete}>Elimina Task</button>
    </div>}
    </>

}