// import "./style.css";

import * as React from "react";
// import * as ReactDom from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import { createCustomEqual } from "fast-equals";
// import { isLatLngLiteral } from "@googlemaps/typescript-guards";

import Map from "./Components/Map";
import Marker from "./Components/Marker";

// const render = (status: Status) => {
//   return <h1>{status}</h1>;
// };

const App = () => {
  const arr=[];
  const center={lat:0,lng:0}
  const zoom=4
  const positions=[{lat:-26.363,lng:131.044},{lat:-27.363,lng:131.044}]
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  // const CLICKS=[{lat:-25.363,lng:131.044}
  //   ,{lat:-25.363,lng:131.044},{lat:-25.363
  //     ,lng:131.044},{lat:-25.363,lng:131.044}
  //     ,{lat:-25.363,lng:131.044}]

  const onClick = (e: google.maps.MapMouseEvent) => {
    // arr.push(e.latLng)
    // alert(clicks[0])
    setClicks([...clicks,e.latLng]);
  };
  // console.log("myarr",arr)
const myMark=(index:number)=>{
  alert(index)
}
  
  return(
    <>
    <Wrapper apiKey="AIzaSyBh88cacs9bn0xo9TWcaQMVZphSHYL_AmA">
      <Map 
      center={center} 
      zoom={zoom}
      onClick={onClick}
      clicks={clicks}
      >
        {clicks.map((pos,index)=>(
      <Marker key={index} onClick={onClick} position={pos}
      //  click={myMark}
       />

        ))}
      </Map>
    </Wrapper>
    {clicks.map((latLng, i) =>{
      console.log(JSON.stringify(latLng.toJSON(), null, 2))
return(
  <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>

)
    }
     
       )}
    
       
    </>
  )
}

export default App