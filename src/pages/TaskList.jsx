import { useEffect, useMemo, useState } from "react";
import TaskRow from "../components/TaskRow";
import { useTaskApi} from "../contexts/ApiContext"

export default function TaskList (){
    const {tasks, updateTask, removeTask, addTask} = useTaskApi();
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);

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

        return currentTaskOrdered();
    }, [tasks, sortBy, sortOrder])

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

   
    console.log(tasks);
    console.log("sort order", sortOrder);
    console.log("sort by", sortBy);

    return <div>
        <h1>Task List</h1>

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
