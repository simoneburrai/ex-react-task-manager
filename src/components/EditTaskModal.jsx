import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";


export default function EditTaskModal(props){
    const {show, onClose, task, onSave} = props;
    const editFormRef = useRef();
    const navigate = useNavigate();


const FormContent = ()=>{
    const defaultFormData = {
        title: task.title,
        description: task.description,
        status : task.status
    }
    const [formData, setFormData] = useState(defaultFormData)
  
    const handleChange= (e)=>{
        const {name, value} = e.target;
        setFormData(prev=>({
            ...prev,
            [name]: value
        }))
    }


    const submitForm = (e)=>{
    e.preventDefault();
    if(formData.title.trim() && formData.description.trim()){
         onSave({
            ...task,
            ...formData
         });
         onClose();
         navigate(-1);


    }
   
    }

    useEffect(()=>{
        setFormData(defaultFormData)
    }, [task])

    return <form ref={editFormRef} onSubmit={submitForm}>
    <input onChange={handleChange} type="text" name="title" value={formData.title}/>
    <textarea onChange={handleChange} name="description" id="description" value={formData.description} ></textarea>
    <select onChange={handleChange} name="status" id="status">
        <option value="To do">To Do</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
    </select>
</form>
}


    return <>
    <Modal onClose={onClose} show={show} title={"Modifica Task"} content={<FormContent/>} onConfirm={()=>editFormRef.current.requestSubmit()}/>
    </>
}

