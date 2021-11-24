import { useEffect, useState } from "react";
function Marker(
    {position,map}:
    {position:google.maps.LatLng,
    map?:google.maps.Map
}){
    console.log(position)
    const [marker,setMarker]=useState<google.maps.Marker | null >(null)
    useEffect(()=>{
// new google.maps.Marker({position})
setMarker( new google.maps.Marker())
    },[])
   if (marker)
 {  marker.setMap(map)
   marker.setPosition(position)}

    return <h1>dasfa</h1>
}
export default Marker