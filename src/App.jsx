import { Route, Routes, BrowserRouter } from "react-router-dom"
import AddTask from "./pages/TaskList copy"
import TaskList from "./pages/TaskList"
import DefaultComponent from "./components/DefaultComponent"

function App() {


  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultComponent/>}>
        <Route path="/tasks" element={<TaskList/>}/>
        <Route path="/add-task" element={<AddTask/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App
