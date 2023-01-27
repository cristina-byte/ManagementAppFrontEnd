import { useContext } from "react"
import { AuthUserContext } from "../../authentification/AuthenticationProvider"

function Home(){

    //take from context
    const {authUser}=useContext(AuthUserContext)

    //a query for oportunities that are still available because of deadline and he ddidn applied for


    //a query for meetings for this week




    return (
        <div className="page">
              <h1>Welcome to the volunteer community</h1>

        </div>
    )
}

export default Home