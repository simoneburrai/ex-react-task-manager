import { useEffect } from "react";
import TaskRow from "../components/TaskRow";
import { useTaskApi} from "../contexts/ApiContext"

export default function TaskList (){
    const {tasks, updateTask, removeTask, addTask} = useTaskApi();
    console.log(tasks);

    return <div>
        <h1>Task List</h1>

        <table className="table">
            <thead>
                <tr className="row">
                    <th className="col">Nome</th>
                    <th className="col">Stato</th>
                    <th className="col">Data di creazione</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task=>
                    <TaskRow key={task.id} task={task}/>
                )}
                
            </tbody>
        </table>
    </div>
}