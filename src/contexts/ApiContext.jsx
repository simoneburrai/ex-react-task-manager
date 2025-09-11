import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const TaskContext = createContext();

const TaskContextProvider = ({children})=> {
    const apiUrl = "http://localhost:3001"
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${apiUrl}/tasks`);
        const data = await response.json();
        
        console.log("Dati recuperati dall'API:", data);
        
        setTasks(data);
      } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = ()=> {
    return useContext(TaskContext);
}

export {useTasks, TaskContextProvider}