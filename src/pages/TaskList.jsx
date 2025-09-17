import { useEffect, useMemo, useState } from "react";
import TaskRow from "../components/TaskRow";
import { useTaskApi} from "../contexts/ApiContext"
import { useCallback, useRef } from "react";
let timeOutTime = null;

export default function TaskList (){
    const {tasks, updateTask, removeTask, addTask} = useTaskApi();
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const orderedTask = useMemo(()=>{
        const titleOrdered = tasks.toSorted((a, b)=>a.title.localeCompare(b.title));
        const statusOrdered = tasks.toSorted( (a,b) =>{
            const order = { "To do": 1, "Doing": 2, "Done": 3 };
            return order[a.status] - order[b.status];
        });
        const dateOrdered = tasks.toSorted((a,b)=>{
            const firstDate = new Date(a.createdAt).getTime();
            const secondDate = new Date(b.createdAt).getTime();
            return firstDate - secondDate;
        })

        const currentTaskOrdered = ()=>{
            let currentTasks = tasks;
            if(sortBy === "title"){
                currentTasks = titleOrdered
            }else if(sortBy === "status"){
                currentTasks = statusOrdered
            }else if(sortBy === "createdAt"){
                currentTasks = dateOrdered
            }

            return sortOrder > 0 ? currentTasks : currentTasks.reverse();
        }

        const filteredTasksQuery = ()=>{
            const currentTasks = currentTaskOrdered();
            if(searchQuery){
                return currentTasks.filter(task=>{
                const taskTitle = task.title.toLowerCase();
                const taskStatus = task.status.toLowerCase();
                return taskTitle.includes(searchQuery.toLocaleLowerCase()) ||
                taskStatus.includes(searchQuery.toLocaleLowerCase());
            })
            }else{
                return currentTasks;
            }
            
        }

        return filteredTasksQuery();
    }, [tasks, sortBy, sortOrder, searchQuery])

    const handleSorting = (e)=>{
        
        let tableHeading = e.target.innerText;
        if(tableHeading === "Nome"){
            tableHeading = "title";
        }else if(tableHeading === "Stato"){
            tableHeading = "status";
        }else if(tableHeading === "Data di creazione"){
            tableHeading = "createdAt"
        }
        console.log("table heading", tableHeading)

        if(sortBy === tableHeading){
            setSortOrder(prev=>prev * -1)
        }else{
            setSortBy(tableHeading);
            setSortOrder(1);
        }
    }


    function useDebounce(callback, delay) {
        

        const debouncedFun = useCallback((...args) => {
            if (timeOutTime) {
            clearTimeout(timeOutTime);
            }

            timeOutTime = setTimeout(() => {
            callback(...args);
            }, delay);
        }, [callback, delay]);

        return debouncedFun;
    }


    const handleSearch = useDebounce((value) => {
        setSearchQuery(value); 
    }, 500);

   
    console.log(tasks);
    console.log("sort order", sortOrder);
    console.log("sort by", sortBy);

    return <div>
        <h1>Task List</h1>
        <label>
            <span>Ricerca Task: </span>
            <input type="text" placeholder="Search..."  onChange={e=>handleSearch(e.target.value)}/>
        </label>

        <table className="table">
            <thead>
                <tr className="row">
                    <th className="col"><button onClick={handleSorting}>Nome</button></th>
                    <th className="col"><button onClick={handleSorting}>Stato</button></th>
                    <th className="col"><button onClick={handleSorting}>Data di creazione</button></th>
                </tr>
            </thead>
            <tbody>
                {orderedTask.map(task=>
                    <TaskRow key={task.id} task={task}/>
                )}
                
            </tbody>
        </table>
    </div>
};



