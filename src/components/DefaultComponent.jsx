import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"
export default function DefaultComponent(){
    return <>
        <header>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/add-task">Add Tasks</NavLink>
        </header>
        <main><Outlet/></main>
    </>
}