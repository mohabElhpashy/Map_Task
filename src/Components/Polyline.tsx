import { useEffect, useState } from "react";
let flightPath: google.maps.Polyline;
let polygon: google.maps.Polygon;

type MarkerStruct ={
    position: google.maps.LatLngLiteral[],
    map?: google.maps.Map,
    // onClick?: (e: google.maps.MapMouseEvent) => void,
    // clicks: google.maps.LatLng[],
    // remove: boolean,
    // INDEX: google.maps.LatLng,
    // is_f_Point:boolean
}
function Poly({ position, map }:MarkerStruct) {
    function addline() {
        flightPath.setMap(map)
    }
  
    function addColor() {
        polygon.setMap(map)
    }

    console.log("POSOSOSOSOOS",position)
    flightPath= new google.maps.Polyline({
        path:position,
        strokeColor: "#000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        clickable: true
    });
     polygon =  new google.maps.Polygon({
         paths:position,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#000",
        fillOpacity: 0.35,
    });
    
    const [draw, setDraw] = useState<google.maps.Polygon | null>(null)
    useEffect(() => { setDraw(new google.maps.Polygon()) }, [])
    if (draw) {
        draw.setMap(map)
    }
    useEffect(() => {
        // if (draw) {
        //     ["click"].forEach((addline) => {
        //         google.maps.event.clearListeners(draw, addline)
        //         addline
        //     })
           
        // }
        addline()
        addColor()
    }, [addColor,]);

    return null
}
export default Poly