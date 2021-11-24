import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
let flightPath: google.maps.Polyline;
let polygon:google.maps.Polygon

function Map(
    {center,zoom,children,onClick,clicks}:
    {center:google.maps.LatLngLiteral,
    zoom:number,
    clicks:google.maps.LatLng[],
    children:ReactNode,
    onClick?: (e: google.maps.MapMouseEvent) => void})
    
    
    {
    const [map,setMap]=useState<google.maps.Map|null>(null)
const ref=useRef<HTMLDivElement>();
const style={height:"100vh"};

//ployline 
function addLine(): void {
  flightPath.setMap(map);

}
// const flightPathCoordinates: google.maps.LatLng[] = clicks

const flightPathCoordinates=[
  {
    lat: 22.06527806776582,
    lng: -21.26953125
  },
  
  {
    lat: 16.06692895745012,
    lng: -38.12255859375
  },
  {
    lat: 6.970049417296232,
    lng: -21.4892578125
  },
  {
    lat: 22.06527806776582,
    lng: -21.26953125
  }
]
flightPath = new google.maps.Polyline({
  path: flightPathCoordinates,
  geodesic:true,
  strokeColor: "#000",
  strokeOpacity: 1.0,
  strokeWeight: 2,
  icons: [{
    offset: '0',
    repeat: '10px'
}],
});


// polygon=new google.maps.Polygon({
//   paths:flightPathCoordinates,
//   strokeColor:"#ff0000"
// })
// polygon.setMap(map)

  useEffect(()=>{
setMap (new window.google.maps.Map(ref.current!,{}))
    },[])
    if (map){
        map.setCenter(center)
        map.setZoom(zoom)
    }
    useEffect(() => {
        if (map) {
          ["click"].forEach((eventName) =>{
            google.maps.event.clearListeners(map, eventName)

          }
          );
    
          if (onClick) {
            map.addListener("click", onClick);
            map.addListener("click", addLine);

console.log("my coordinates",clicks)

          }
    
        
        }
      }, [map, onClick]);
    return <div ref={ref} style={style} id="map" onClick={(e)=>e}>
        {React.Children.map(children,(child:ReactElement)=>
        React.cloneElement(child,{map})
        )}
    </div>
}
export default Map