import { useContext,useState } from "react"
import { useQuery } from "react-query"
import { addDays,startOfWeek } from "date-fns"
import { AuthUserContext } from "../../authentification/AuthenticationProvider"
import axiosInstanceLocal from "../../utils/axiosLocal"
import Oportunity from "../../components/HomeComponents/Oportunity"
import Meeting from "../../components/Meeting"

function Home(){

    //take from context
    const {authUser}=useContext(AuthUserContext)

    const [currentDate,setCurrentDate]=useState(new Date())

    //a query for oportunities that are still available because of deadline and number of positions available
    
    const fetchOportunities=async ()=>{
        const response=await axiosInstanceLocal.get("oportunities/available",
        {headers: {"Authorization" : `Bearer ${authUser.token}`}})
        return response.data
    }

    const fetchMeetings=async ()=>{
      const response=await axiosInstanceLocal.get(`${authUser.id}/meetings?month=${currentDate.getMonth()+1}&year=${currentDate.getFullYear()}`,
      { headers: {"Authorization" : `Bearer ${authUser.token}`} })
      return response.data
    }

    const {data}=useQuery(['availableOportunities'],fetchOportunities)
    const {data:weekMeetings}=useQuery(['meetings'],fetchMeetings)

    function compareFn(a, b) {
      if (a<b) 
          return -1;
      if (a >b) 
          return 1;
      return 0;
  }

     //functie care returneaza meetings pentru o data
     const getMeetingsForDate=(day,meetingsArray)=>{
      const meetings=meetingsArray.filter( (m)=>new Date(m.startDate).getDate()==day.getDate()
      && new Date(m.startDate).getMonth()==day.getMonth() && 
      new Date(m.startDate).getFullYear()==day.getFullYear() )
      return meetings.sort((a,b)=>compareFn(new Date(a.startDate),new Date(b.startDate)))
   } 

 //functie care returneaza zilele saptamanii
  const currentWeekMeetings=()=>{
      const startDate=startOfWeek(currentDate)
      const meetings=[]
      let day=startDate

      for (let i = 0; i < 7; i++) {
       meetings.push(...getMeetingsForDate(day,weekMeetings))
          day = addDays(day, 1); 
      }
      console.log(meetings)
      return meetings;
  }

    //a query for meetings for this week

    return (
        <div className="page">
              <h1>Welcome to the volunteer community</h1>
              {data && 

              <div className="home-sections">
              <div className="available-oportunities">
                <h1 className="section-title">Check out this oportunities</h1>

                <div className="oportunities" style={{display:'flex',flexDirection:'column',gap:'10px',marginTop:'10px'}}>
                {data.map(op=>
                <Oportunity 
                key={op.id} 
                name={op.title} 
                description={op.description} 
                imgUrl={op.imageLink}
                id={op.id}
                deadline={op.applicationDeadline}
                />)}
                </div>
              </div>

              {weekMeetings && 

              <div className="week-meetings">
                <h1 className="section-title">Meetings for this week</h1>
                <div className="meetings">
                  {currentWeekMeetings().map( meeting=>
                    <Meeting
                    key={meeting.id}
                    name={meeting.title} 
                    startTime={meeting.startDate} 
                    address={meeting.address} 
                    id={meeting.id}
                    endTime={meeting.endDate}
                    />)
                  }
                </div>
              </div>}
              </div>}
        </div>
    )
}

export default Home