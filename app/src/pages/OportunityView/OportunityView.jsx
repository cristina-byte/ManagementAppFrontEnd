import { useParams } from "react-router-dom"
import {useQuery} from "react-query"
import Moment from 'moment'
import axiosInstanceLocal from "../../axiosLocal"
import style from "./OportunityView.css"
import CoreTeamPosition from "../../components/CoreTeamPosition"


function OportunityView(){

    const parameter=useParams()

    const fetchOportunity=async()=>{
        const response=await axiosInstanceLocal.get(`/Oportunities/${parameter.id}`)
        return response.data
    }

    const{
        data,
        isLoading
    }=useQuery(['oportunityQueryKey'],fetchOportunity)


   const getCoreTeamPositions=()=>{
    console.log("we are here")

    const positions=data.positions.map( (position)=>{
       return (
        <CoreTeamPosition 
        key={position.id} 
        name={position.name} 
        leftSits={position.leftSits}
        />
       )
    })

    console.log(positions)
    return positions
   }

    return (
        <section className="oportunity-section page">
            {data && 
            <div className="oportunity-data">
                <img src={data.imageLink} alt="" />
                <h1 className="name">{data.title}</h1>
                <p className="date">{Moment(data.startDate).format('MMMM Do YYYY')} - {Moment(data.endDate).format('MMMM Do YYYY')}</p>
                <p >{"You can apply until : "+Moment(data.applicationDeadlin).format('MMMM Do YYYY')}</p>
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