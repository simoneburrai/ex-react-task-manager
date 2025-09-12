import { useEffect, useState } from "react";

export default function useTasks(){

    const [tasks, setTasks] = useState([]);
    const apiUrl = "http://localhost:3001/tasks"

    
        useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            console.log("Dati recuperati dall'API:", data);
            
            setTasks(data);
          } catch (error) {
            console.error("Errore nel recupero dei dati:", error);
          }
        };
    
        fetchTasks();
      }, []);
    

    const addTask = async(formData)=>{

      try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

          if(response.ok){
          if(result.success){
            console.log(result);
            setTasks(prev=>[...prev, result.task]);
          } else {
            throw new Error("Problema nell'inserimento della Task");
          }
        } else {
            const errorData = result.message || `Errore HTTP: ${response.status}`;
            throw new Error(errorData);
        }
      } catch (error) {
        console.error("Errore nella chiamata API:", error);
        throw error;
      }
}
    const removeTask = ()=>{}
    const updateTask = ()=>{}

    return {addTask, removeTask, updateTask, tasks};
}