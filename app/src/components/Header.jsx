import {Link} from "react-router-dom"

export default function Header(){
    return (
    <nav>
        <ul>
            <li> <Link to="members">Members</Link></li>
            <li> <Link to="events">Events</Link></li>
            <li> <Link to="teams">Teams</Link></li>
            <li> <Link to="chat">Chat</Link></li>
            <li> <Link to="oportunities">Oportunities</Link></li>
            <li> <Link to="calendar">Calendar</Link></li>
        </ul>
    </nav>
    )
}