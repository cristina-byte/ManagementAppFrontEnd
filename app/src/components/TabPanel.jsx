
export function TabPanel({children,value,index}){
    if(value==index){
        return(
            <div className="tab-content">
                {children} 
            </div>   
        )
    }
}