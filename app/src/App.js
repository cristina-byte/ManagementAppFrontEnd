
import {Outlet} from "react-router-dom"
import Header from "./components/Header.jsx"
import style from './App.css'

function App() {
  return (
       <div className="App">
        <Header/>
        <div className="current-user-header">
        <p>Cristina Siscanu</p>
        <img src="https://www.sulyokimaging.ro/wp-content/uploads/2021/08/fotografii-CV-pret.jpg"/>
        </div>
        <Outlet/>
       </div>
  )}

export default App;
