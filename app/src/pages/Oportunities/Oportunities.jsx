import { useEffect , useState } from "react"
import Oportunity from "../../components/Oportunity"
import style from "./Oportunities.css"

export default function Oportunities(){

    const [oportunities, setOportunities]=useState(null)//this is a hook useStaet, which is a function javascript

    useEffect(()=>{
        fetch('https://localhost:7257/api/Oportunities/?page=1')
        .then(result=>result.json())
        .then(data=>{console.log(data); return setOportunities(data)})
    },[])

    return (
        <section className="oportunities">
           <h1 className="title-page">Oportunities</h1>
           <div className="oportunities-container">
            {oportunities && oportunities.map(oportunity=><Oportunity key={oportunity.id} 
             name={oportunity.title} imgUrl={oportunity.imageLink}/>)}
           </div>
        </section>
    )
}