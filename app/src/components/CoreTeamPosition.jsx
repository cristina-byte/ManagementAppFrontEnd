

function CoreTeamPosition(props){
    return (
        <div className="core-position">
            <div className="info">
            <p style={ {color:'#2B3674',} } >{props.name}</p>
            <p style={{color:' #A3AED0',marginTop:'5px'} }  >{props.leftSits}{' position free'}</p>
            </div>
            <button className="button">Apply</button>
        </div>
    )
}

export default CoreTeamPosition