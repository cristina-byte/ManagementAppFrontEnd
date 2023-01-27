
import {useState,useContext} from "react"
import CalendarHeader from "./CalendarHeader"
import {format,startOfWeek,addDays,endOfMonth,startOfMonth,endOfWeek,addMonths,subMonths} from "date-fns";
import Day from "./Day"
import { useQuery } from "react-query";
import axiosInstanceLocal from "../utils/axiosLocal"
import { AuthUserContext } from "../authentification/AuthenticationProvider";

const Calendar=()=>{

    //data curenta pentru a naviga in calendar
    const [currentDate,setCurrentDate]=useState(new Date())

    //utilizatorul autentificat
    //take from context
    const {authUser}=useContext(AuthUserContext)

    //adauga 1 luna
    const setNextMonth=()=>{
        const newDate=addMonths(currentDate,1)
        setCurrentDate(newDate)
    }

    //scade 1 luna
    const setPreviousMonth=()=>{
        const newDate=subMonths(currentDate,1)
        setCurrentDate(newDate)
    }
  
    //functie care returneaza meetings from api pentru luna si anul curent
    const fetchMeetings=async ()=>{
        const response=await axiosInstanceLocal.get(`${authUser.id}/meetings?month=${currentDate.getMonth()+1}&year=${currentDate.getFullYear()}`,
        { headers: {"Authorization" : `Bearer ${authUser.token}`} })
        return response.data
    }

    //query
    const {data}=useQuery(['meetingsQueryKey',currentDate],
        fetchMeetings)

    function compareFn(a, b) {
        if (a<b) 
            return -1;
        if (a >b) 
            return 1;
        return 0;
    }

    //functie care returneaza meetings pentru o data
     const getMeetingsForDate=(day)=>{
        const meetings=data.filter( (m)=>new Date(m.startDate).getDate()==day.getDate()
        && new Date(m.startDate).getMonth()==day.getMonth() && 
        new Date(m.startDate).getFullYear()==day.getFullYear() )
        return meetings.sort((a,b)=>compareFn(new Date(a.startDate),new Date(b.startDate)))
     } 

   //functie care returneaza zilele saptamanii
    const renderWeekDays=()=>{
        const startDate=startOfWeek(currentDate)
        let formattedWeekDay=""
        const days=[]
        let day=startDate

        for (let i = 0; i < 7; i++) {
            formattedWeekDay=format(day,'eeee')
            days.push(
                <div className={`day dayOfWeek ${day.getDay()==0?'no-left-border':''}`} key={day.getDay()}>
                    <p>{formattedWeekDay}</p>
                </div>
            )
            day = addDays(day, 1); 
        }
        return (<div className="daysOfWeek">{days}</div>)
    }

    //functie care returneaza zilele lunii curente
    const renderDaysOfMonth=()=>{
        const startMonth=startOfMonth(currentDate)
        const endMonth=endOfMonth(currentDate)
        const startDate=startOfWeek(startMonth)
        const endDate = endOfWeek(endMonth);

        let days = [];
        let rows=[]
        let day = startDate;
        let formattedDate = "";
        let week=0;
       
        while(day<=endDate){
            week++;
            days=[]
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day,'d');

                const meetings=getMeetingsForDate(day)

                days.push(
                    <Day 
                    key={day}
                    class= {`day ${day.getDate()==currentDate.getDate() && currentDate.getMonth()==day.getMonth()?'current-day':
                    day.getMonth()!=currentDate.getMonth()?'inactive-day':''} ${day.getDay()==0?'no-left-border':''}`}
                    date={formattedDate}
                    meetings={meetings}/>
                )
                day = addDays(day, 1); 
            }
            rows.push(<div className="row" key={week}>{days}</div>)
        }
        return (<div className="days-container" >{rows}</div>)
    }

    return (
        <div className='calendar' >
            <CalendarHeader 
            month={format(currentDate,"MMMM")} 
            back={setPreviousMonth}  
            next={setNextMonth} 
            year={format(currentDate,"yyyy")}/>
            {renderWeekDays()}
            {data && renderDaysOfMonth()}
        </div>
    )
}

export default Calendar