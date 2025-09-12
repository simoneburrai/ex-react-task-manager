import { useEffect, useState } from "react";

export default function useTasks(){

    const [tasks, setTasks] = useState([]);
    const apiUrl = "http://localhost:3001/tasks"

    
        useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await fetch(`${apiUrl}`);
            const data = await response.json();
            
            console.log("Dati recuperati dall'API:", data);
            
            setTasks(data);
          } catch (error) {
            console.error("Errore nel recupero dei dati:", error);
          }
        };
    
        fetchTasks();
      }, []);
    

    const addTask = ()=>{}
    const removeTask = ()=>{}
    const updateTask = ()=>{}

    return {addTask, removeTask, updateTask, tasks};
}