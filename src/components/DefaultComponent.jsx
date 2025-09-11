import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"
export default function DefaultComponent(){
    return <>
        <header >
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/tasks">Tasks</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/add-task">Add Tasks</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </header>
        <main className="p-3"><Outlet/></main>
    </>
}