
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CalendarHeader=(props)=>{

    return (
        <div className='calendar-header'>
            <IconButton onClick={()=>props.back()}>
                <ArrowBackIosIcon fontSize='medium' htmlColor='#2E3789'/>
            </IconButton>
            <div className="date" style={{display:'flex',gap:10}}>
            <h1> {props.month}</h1>
            <h1> {props.year}</h1>
            </div>
            <IconButton onClick={()=>props.next()}>
                <ArrowForwardIosIcon fontSize='medium' htmlColor='#2E3789'/>
            </IconButton>
        </div>
    )
}

export default CalendarHeader