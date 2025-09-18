import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { useTaskApi } from "../contexts/ApiContext";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
const {VITE_API_TASK_URL} = import.meta.env;

export default function TaskDetail(){

    const navigate = useNavigate();
        let {id} = useParams()
    id = parseInt(id);

    const {removeTask, updateTask} = useTaskApi()

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("");
    const [showDelete, setShowDelete] = useState(false);
    const [showModify, setShowModify] = useState(false)
    const onCloseDelete = ()=>setShowDelete(false);
    const onCloseModify = ()=>setShowModify(false);

    const fetchTask = async()=>{
        try {
            setLoading(true)
            const response = await fetch(`${VITE_API_TASK_URL}/tasks`);
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

    const onConfirm = async () => {
    try {
      await removeTask(id);
      alert("Task eliminata con successo!");
      navigate(-1)
    } catch (err) {
      alert(`Errore durante l'eliminazione: ${err.message}`);
    }
  };

    const onSave= (task)=>{
        try {
            updateTask(task);
            alert("Modifica avvenuta con successo")
        } catch (error) {
            alert(error);
        }
    }

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
        <button className="btn btn-danger" onClick={()=>setShowDelete(true)}>Elimina Task</button>
        <button className="btn btn-warning" onClick={()=>setShowModify(true)}>ModificaTask</button>
        <EditTaskModal show={showModify} onClose={onCloseModify} task={task} onSave={onSave}/>
        <Modal onClose={onCloseDelete
        } show={showDelete} title={task.title} content={task.description} onConfirm={onConfirm} />
    </div>}
    </>

}