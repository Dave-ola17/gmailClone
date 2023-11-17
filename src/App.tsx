import { Route, Routes } from "react-router-dom"
import './App.css'
import Snoozed from "./components/Snoozed"
import Starred from "./components/Starred"
import Inbox from "./components/Inbox"
import Draft from "./components/Draft"
import Important from "./components/Important"
import Chart from "./components/Chart"
import Scheduled from "./components/Scheduled"
import Spam from "./components/Spam"
import Category from "./components/Category"
import Bin from "./components/Bin"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/Snoozed" element={<Snoozed />} />
        <Route path="/Starred" element={<Starred />} />
        <Route path="/Draft" element={<Draft />} />
        <Route path="/Important" element={<Important />} />
        <Route path="/Chart" element={<Chart />} />
        <Route path="/Scheduled" element={<Scheduled />} />
        <Route path="/Spam" element={<Spam />} />
        <Route path="/Bin" element={<Bin />} />
        <Route path="/Category" element={<Category />} />
      </Routes>
    </div>
  )
}

export default App
