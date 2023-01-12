
import {Routes,Route} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import Events from "./pages/Events/Events.jsx"
import Oportunities from "./pages/Oportunities/Oportunities.jsx"
import Teams from "./pages/Teams/Teams.jsx"
import Chat from "./pages/Chat/Chat.jsx"
import Calendar from "./pages/Calendar/Calendar.jsx"
import Members from "./pages/Members/Members.jsx"
import Profile from "./pages/Profile/Profile"
import EventView from "./pages/EventView/EventView"
import OportunityView from "./pages/OportunityView/OportunityView.jsx"
import SignIn from "./pages/SignIn/SignIn.jsx"
import RegisterAccount from "./pages/RegisterAccount/RegisterAccount.jsx"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx"
import style from "./App.css"
import User from "./pages/User/User.jsx"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const queryClient=new QueryClient()

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <QueryClientProvider client={queryClient}>
       <div className="App">
      <Routes>
        <Route index element={<SignIn/>}/>
        <Route path="sign-in" element={<SignIn/>}/>  
        <Route path="register" element={<RegisterAccount/>}/>  
        <Route path="resetPassword" element={<ForgotPassword/>}/>  
        <Route path="user" element ={<User/>}>
          <Route path="events" element={<Events/>}/>
          <Route path="events/:id" element={<EventView/>}/>
          <Route path="oportunities" element={<Oportunities/>}/>
          <Route path="oportunities/:id" element={<OportunityView/>}/>
          <Route path="teams" element={<Teams/>}/>
          <Route path="chat" element={<Chat/>}/>
          <Route path="calendar" element={<Calendar/>}/>
          <Route path="members" element={<Members/>}/>
          <Route path="members/:id" element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
    </QueryClientProvider>
  </LocalizationProvider>
   
  )}

export default App;
