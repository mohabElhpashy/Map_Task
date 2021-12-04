import { useEffect, useState } from "react";
let flightPath: google.maps.Polyline;
let polygon: google.maps.Polygon;

type MarkerStruct ={
    position: google.maps.LatLngLiteral[],
    map?: google.maps.Map,
    color:string,
    INDEX,
    allDta,
    getClick
clickPoly?:()=>void
 
}
function Poly({ position, map,color,INDEX,allDta,getClick }:MarkerStruct) {
    function addline() {
        flightPath.setMap(map)
    }
  
    function addColor() {
        polygon.setMap(map)
    }

    flightPath= new google.maps.Polyline({
        path:position,
        geodesic: false,
        strokeWeight: 1,
        map: map
    });
     polygon =  new google.maps.Polygon({
         paths:position,
         geodesic: false,
         strokeWeight: 1,
         map: map,
         fillColor:color
    });
    
    const [draw, setDraw] = useState<google.maps.Polyline | null>(null)
    useEffect(() => { setDraw(new google.maps.Polyline()) }, [])
    if (draw) {
        draw.setMap(map)
    }
    google.maps.event.addListener(polygon, 'click',function() {
        getClick(INDEX)
        document.getElementById("context_menu").style.display="flex"
    }
    );  
    useEffect(() => {   
        addline()
        addColor()
    }, []);

    return null
}
export default Poly