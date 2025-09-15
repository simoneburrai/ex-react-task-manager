import { useCallback, useEffect, useState } from "react";

export default function useTasks(){

    const [tasks, setTasks] = useState([]);
    const apiUrl = "http://localhost:3001/tasks"

    const fetchTasks = useCallback(async () => {
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            console.log("Dati recuperati dall'API:", data);
            
            setTasks(data);
          } catch (error) {
            console.error("Errore nel recupero dei dati:", error);
          }
    }, [apiUrl]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);
    

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
            setTasks(prev=>[...prev, result.task])
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
    const removeTask = async(taskId)=>{

      try {
        const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
          method: "DELETE"
        })

        const parsedResponse = await response.json();

        console.log(parsedResponse);
        
        if(parsedResponse.success){
          console.log("Task Eliminata con successo")
          setTasks(prevTasks =>{
            return prevTasks.filter(task=> Number(task.id) !== Number(taskId));
          });
        }else{
          throw new Error(parsedResponse.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    const updateTask = async(updatedTask)=>{

      try {
        const response = await fetch(`${apiUrl}/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
        });
        const parsedResponse = await response.json();
        if(response.ok){
            if(parsedResponse.success){
              console.log("La task è stata aggiornata con successo");
              setTasks(prev=>{
                const updatedTasks = prev.map(task=> {
                  if(Number(task.id)===Number(updatedTask.id)){
                    return updatedTask
                  }else{
                    return task
                  }
                } );
                return updatedTasks;
              })
            }else{
              throw new Error(parsedResponse.message)
            }
        }else{
          throw new Error("Errore nella chiamata di modifica API")
        }
      } catch (error) {
        console.error(error);
      }
      

    }

    return {addTask, removeTask, updateTask, tasks};
}