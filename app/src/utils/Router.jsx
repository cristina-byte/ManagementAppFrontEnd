import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Profile from "../pages/Profile/Profile.jsx"
import OportunityView from "../pages/OportunityView/OportunityView.jsx"
import Calendar from "../pages/Calendar/Calendar.jsx"
import Members from "../pages/Members/Members.jsx"
import Oportunities from "../pages/Oportunities/Oportunities.jsx"
import RegisterAccount from "../pages/RegisterAccount/RegisterAccount.jsx"
import SignIn from "../pages/SignIn/SignIn.jsx"
import AddOportunity from "../pages/Oportunities/AddOportunity"
import EditOportunity from "../pages/Oportunities/EditOportunity"
import ViewMeeting from "../pages/Calendar/ViewMeeting"
import AddMeeting from "../pages/Calendar/AddMeeting"
import { Settings } from "../pages/Settings"
import { PrivateRoute } from "../components/PrivateRoute"
import {AuthorizationRoute} from "../components/AuthorizationRoute"
import NoMatchRoute from "../pages/NoMatchRoute/NoMatchRoute"
import { AuthenticatedUserProvider } from "../authentification/AuthenticationProvider"
import Home from "../pages/Home/Home"

const router=createBrowserRouter([
    {
        path:'/',
        element:
        <AuthorizationRoute redirectUrl="/sign-in" >
            <AuthenticatedUserProvider>
                <App/>
            </AuthenticatedUserProvider>  
        </AuthorizationRoute>,
        
        children:[
            {
                index:true,
                element:<Home/>

            },
            {   path:'members',
                element:<Members/>
            },
           
            {
                path:'members/:id',
                element:<Profile/>
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
                path:'oportunities/add',
                element:<PrivateRoute allowList={['admin']} redirectUrl="/oportunities" ><AddOportunity/></PrivateRoute>
            },
            {
                path:'oportunities/:id/edit',
                element:<PrivateRoute allowList={['admin']} redirectUrl="/oportunities"><EditOportunity/></PrivateRoute>
            },
            {
                path:'calendar',
                element:<Calendar/>
            },
            {
                path:'calendar/:id',
                element:<ViewMeeting/>
            },
            {   
                path:'calendar/add',
                element:<AddMeeting/>
            },
            {
                path:'settings',
                element:<PrivateRoute allowList={['admin']} redirectUrl="/" ><Settings/></PrivateRoute>
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
        path:'*',
        element:<NoMatchRoute/>
    }
])

export default router