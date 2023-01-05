
import {Routes,Route} from "react-router-dom"
import Header from "./components/Header.jsx"
import Events from "./pages/Events/Events.jsx"
import Oportunities from "./pages/Oportunities/Oportunities.jsx"
import Teams from "./pages/Teams/Teams.jsx"
import Chat from "./pages/Chat/Chat.jsx"
import Calendar from "./pages/Calendar/Calendar.jsx"
import Members from "./pages/Members/Members.jsx"
import style from "./App.css"



function App() {
  return (
    <div className="App">
      <Header/>
      <main>
      <Routes>
      <Route path="/events" element={<Events/>}/>
      <Route path="/oportunities" element={<Oportunities/>}/>
      <Route path="/teams" element={<Teams/>}/>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/calendar" element={<Calendar/>}/>
      <Route path="/members" element={<Members/>}/>
      </Routes>
      </main>
    </div>
  );
}

export default App;
