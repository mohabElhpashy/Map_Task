import { useEffect, useState } from "react";
function Marker(
    {position,map,onClick}:
    {position:google.maps.LatLng,
    map?:google.maps.Map,
    onClick?: (e: google.maps.MapMouseEvent) => void
    
})

{
    console.log(position)
    const [marker,setMarker]=useState<google.maps.Marker | null >(null)
    useEffect(()=>{
// new google.maps.Marker({position})
setMarker( new google.maps.Marker())
    },[position])
   if (marker)
 {  marker.setMap(map)
   marker.setPosition(position)
    // marker.addListener("click", ()=>{ onClick(); })
    marker.addListener("click", onClick);


}

    return <h1>dasfa</h1>
}
export default Marker