export default function Oportunity(props){

    return (
        <div className="oportunity">
            <img src={props.imgUrl} alt="" />
            <div className="oportunity-data">
                <h1>{props.name}</h1>
                <button>View</button>
            </div>
        </div>
    )
}