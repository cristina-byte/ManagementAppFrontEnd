
//a function that receives a date with 0 offset, 
//calculates the timeZone offset and return a new date object with local date

export const toLocalDate=(date)=>{

    //get time in miliseconds
    const timeNumber=date.getTime()

    //get timeZone offset
    const offsetInMinutes=new Date().getTimezoneOffset()

    //add offset 
    const localDate=timeNumber-(offsetInMinutes*60000)
    return new Date(localDate)
}

//a function that get a date and return the difference between today and the given date

export const calculateTimeDifference=(date)=>{
   
    //get currentDate
    const currentDate=new Date()

    //get difference in milliseconds
    var diffMs = (currentDate - date)
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    if(diffDays>0)
    return `${diffDays} days`

    if(diffHrs>0)
    return `${diffHrs} hours`

    if(diffMins>0)
    return `${diffMins} minutes`
    
    //if less than 1 minute
    return "a moment"
}


export const isInProcess=(start,end)=>{
    const thisMoment=new Date()
    if(thisMoment>start && thisMoment<end)
    return true

    return false
}