import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import useTasks from "../hooks/useTasks";

const TaskContext = createContext();


const TaskContextProvider = ({children})=> {

  const taskData = useTasks();

  return (
    <TaskContext.Provider value={{...taskData}}>
      {children}
    </TaskContext.Provider>
  );
};

const useTaskApi = ()=> {
    return useContext(TaskContext);
}

export {useTaskApi, TaskContextProvider}