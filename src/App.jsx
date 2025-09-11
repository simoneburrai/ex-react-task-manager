import { Route, Routes, BrowserRouter } from "react-router-dom"
import AddTask from "./pages/TaskList copy"
import TaskList from "./pages/TaskList"
import DefaultComponent from "./components/DefaultComponent"
import { TaskContextProvider } from "./pages/ApiContext"

function App() {
  return <TaskContextProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultComponent/>}>
        <Route path="/tasks" element={<TaskList/>}/>
        <Route path="/add-task" element={<AddTask/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
</TaskContextProvider>
}

export default App
