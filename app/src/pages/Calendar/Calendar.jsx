
import CalendarComponent from "../../components/CalendarComponent"
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

 function Calendar(){

    return (
        <section className="page">
             <h1 className="title-page">Calendar</h1>
             <Link to='add'><Button sx={ {marginBottom:'20px',background:'#2E3789'}} variant="contained">Add meeting</Button></Link>
             <CalendarComponent/>
        </section>
    )
}

export default Calendar