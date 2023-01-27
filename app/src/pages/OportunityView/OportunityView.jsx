import { useParams } from "react-router-dom"
import {useQuery,useMutation,useQueryClient} from "react-query"
import Moment from 'moment'
import axiosInstanceLocal from "../../utils/axiosLocal"
import style from "./OportunityView.css"
import CoreTeamPosition from "../../components/CoreTeamPosition"
import EventIcon from '@mui/icons-material/Event';
import { toLocalDate } from "../../utils/dateUtils"
import { useContext } from "react"
import {AuthUserContext} from "../../authentification/AuthenticationProvider"

function OportunityView(){

    const parameter=useParams()

    //take from context
    const {authUser}=useContext(AuthUserContext)

    const queryClient = useQueryClient();

    const fetchOportunity=async()=>{
        const response=await axiosInstanceLocal.get(`/Oportunities/${parameter.id}`,
        { headers: {"Authorization" : `Bearer ${authUser.token}`} })
        return response.data
    }

    const{data}=useQuery(['oportunityQueryKey'],fetchOportunity)

   const getCoreTeamPositions=()=>{
    const positions=data.positions.map( (position)=>{
       return (
        <CoreTeamPosition 
        key={position.id} 
        id={position.id}
        name={position.name} 
        oportunity={parameter.id}
        leftSits={position.leftSits}
        deadline={data.applicationDeadline}
        aply={handleApply}
        />
       )
    })
    return positions
   }

   //aply to an oportunity

   const aplyForPosition=useMutation({
    mutationFn:async(oportunityApplicant)=>{
        console.log(oportunityApplicant)
        const response=await axiosInstanceLocal.post(`/oportunities/${parameter.id}`,oportunityApplicant,
        { headers: {"Authorization" : `Bearer ${authUser.token}`} })
        return response
    }
   })

   const handleApply=(positionId)=>{

    const oportunityApplicant={
        userId:authUser.id,
        coreTeamPositionId:positionId
    }

    aplyForPosition.mutate(oportunityApplicant,{
        onSuccess:()=>{queryClient.invalidateQueries(['oportunityQueryKey'])},
        onError:()=>console.log("Error")
    })
   }

    return (
        <section className="oportunity-section page">
            {data && 
            <div className="oportunity-data">
                <img src={data.imageLink} alt="" />
                <h1 className="name">{data.title}</h1>
                <EventIcon  sx={ {color:'#2E3789',marginTop:'10px'}} />
                
                <p className="date">
                    <span className="monthDate">{Moment(toLocalDate(new Date(data.startDate))) .format('D')}</span> {Moment(toLocalDate(new Date(data.startDate))).format('MMM, yyyy')} - 
                    <span className="monthDate"> {Moment(toLocalDate(new Date(data.endDate))).format('D')}</span> {Moment(toLocalDate(new Date(data.endDate))).format('MMM, yyyy')}
                </p>
                <p className="date" style={{marginTop:'10px'}}>  <span style={{fontWeight:'500',color:'#FF6F1E'}}>{"DEADLINE : "}</span>
                <span className="monthDate">{Moment(data.applicationDeadline).format('D')}</span> {Moment(toLocalDate(new Date(data.applicationDeadline))).format('MMM, yyyy')} AT {Moment(toLocalDate(new Date(data.applicationDeadline))).format('HH:mm')}
                </p>
                <p className="address">{data.address}</p>
                <h1 className="title">Description</h1>
                <p className="description">{data.description}</p>
                <h1 className="title">Core team positions</h1>

                  <div className="positions">
                  {getCoreTeamPositions()}
                  </div>
                </div>
                }
        </section>
    )}

export default OportunityView