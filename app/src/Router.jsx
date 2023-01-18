import {createBrowserRouter} from "react-router-dom"
import App from "./App"
import Profile from "./pages/Profile/Profile.jsx"
import OportunityView from "./pages/OportunityView/OportunityView.jsx"
import EventView from "./pages/EventView/EventView"
import Calendar from "./pages/Calendar/Calendar.jsx"
import Chat from "./pages/Chat/Chat.jsx"
import Events from "./pages/Events/Events.jsx"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx"
import Home from "./pages/Home/Home"
import Members from "./pages/Members/Members.jsx"
import Oportunities from "./pages/Oportunities/Oportunities.jsx"
import RegisterAccount from "./pages/RegisterAccount/RegisterAccount.jsx"
import SignIn from "./pages/SignIn/SignIn.jsx"
import Teams from "./pages/Teams/Teams"

const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'members',
                element:<Members/>
            },
            {
                path:'members/:id',
                element:<Profile/>

            },
            {
                path:'events',
                element:<Events/>
            },
            {
                path:'events/:id',
                element:<EventView/>

            },
            {
                path:'oportunities',
                element:<Oportunities/>
            },
            {
                path:'oportunities/:id',
                element:<OportunityView/>
            },
            {
                path:'calendar',
                element:<Calendar/>
            },
            {
                path:'teams',
                element:<Teams/>
            },
            {
                path:'chat',
                element:<Chat/>
            }
        ]
    },
    {
        path:'/sign-in',
        element:<SignIn/>
    },
    {
        path:'/register',
        element:<RegisterAccount/>
    },
    {
        path:'/resetPassword',
        element:<ForgotPassword/>
    },
])

export default router