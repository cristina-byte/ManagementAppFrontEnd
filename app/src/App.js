
import {Outlet} from "react-router-dom"
import jwt from "jwt-decode"
import { useContext } from "react"
import { useEffect} from "react"
import { AuthUserContext } from "./authentification/AuthenticationProvider.jsx"
import Header from "./components/Header.jsx"
import { UserHeader } from "./components/UserHeader"
import style from './App.css'

function App() {

  const {authUser,setUser}=useContext(AuthUserContext)

  useEffect(()=>{
    const access=JSON.parse(localStorage.getItem('access'))
    const roles=jwt(access)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    const authUser={
      token:access,
      id:jwt(access).id,
      roles:Array.isArray(roles)?roles:[`${roles}`]
    }
    setUser(authUser)
  },[])

  console.log(authUser)

  return (
      <div className="App">
        {
        authUser && 
        <div>
        <Header/> 
        <UserHeader/>
        <Outlet/>
        </div>
        }
       </div>
  )
}

export default App;
