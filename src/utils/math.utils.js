export const normalizeValues = (obj) => {
    return Object.keys(obj).reduce((o, key) =>{
        const value = obj[key];
        if (typeof value === 'number') {
            //it's a number
            return {...o, [key]: Math.round(value * 10) / 10}
        }else{
            return {...o, [key]: value}
        }
        
    },{})
}

export const degreeToRadians = (angle) => {
    return angle * (Math.PI / 180); 
}