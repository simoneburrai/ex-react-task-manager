import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import useTasks from "../hooks/useTasks";

const TaskContext = createContext();


const TaskContextProvider = ({children})=> {

  const {tasks, addTask, updateTask, removeTask} = useTasks();

  return (
    <TaskContext.Provider value={{tasks, addTask, updateTask, removeTask}}>
      {children}
    </TaskContext.Provider>
  );
};

const useTaskApi = ()=> {
    return useContext(TaskContext);
}

export {useTaskApi, TaskContextProvider}