import { Route, Routes, BrowserRouter } from "react-router-dom"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import DefaultComponent from "./components/DefaultComponent"
import { TaskContextProvider } from "./contexts/ApiContext"
import TaskDetail from "./pages/TaskDetail"

function App() {
  return <TaskContextProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultComponent/>}>
        <Route path="/tasks" element={<TaskList/>}/>
        <Route path="/tasks/:id" element={<TaskDetail/>}/>
        <Route path="/add-task" element={<AddTask/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
</TaskContextProvider>
}

export default App
