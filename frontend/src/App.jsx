import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import "./App.css"
import "./styles/colors.css"
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header"

export default function App(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
        </BrowserRouter>
    )
}