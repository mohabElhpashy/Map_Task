import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './App.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Map from "./Components/Map";
import Marker from "./Components/Marker";
import LoginPage from "./Components/Login/LoginPage";
// import Polylines from "./Components/Polylines";
import axios from "axios";
const header ={
  headers : {
      'Accept': 'application/json',
     "Authorization":localStorage.getItem('Auth')
},
}
const App = () => {
  const center = { lat: 25.60190226111573, lng: 20.0390625 }
  const zoom = 4

  const [remove, setRemove] = React.useState<boolean>(false)
  const [clicks, setClicks] = React.useState<google.maps.LatLng[] | any>([]);
  const [dta, setdta] = React.useState< Array<{ lat: string, lng: string }>>([]);
  const[auth,setAuth]=React.useState<boolean>(false)
  const[is_f_Point,setFinalPoint]=React.useState<boolean>(false)

  const [INDEX, setIndex] = React.useState<google.maps.LatLng>()
const checkAuthent=(isAuth:boolean)=>{
setAuth(isAuth)
console.log("authenticatrion",isAuth)
}
  const onClick = function (e: google.maps.MapMouseEvent): boolean {
    // if(e.latLng==clicks[0])
    // {setFinalPoint(true)

    // }
    if (clicks.includes(e.latLng)) {

      var txt;
      if (window.confirm("remove a point?")) {

        txt = "You pressed OK!";
        const h = clicks.filter(click => click != e.latLng)
        setIndex(e.latLng)
        setClicks([...h]);
        setRemove(true)
        return;
      }

      if (clicks[0] != e.latLng) {
        return;
      }
     
    }
    console.log("hi")
    setClicks([...clicks, e.latLng]);
    return;
  };
 const Auth_=localStorage.getItem("Auth");

React.useEffect(()=>{
axios.get("https://zones-backend-halan.herokuapp.com/zones",header).then(zones=>{
  console.log(zones.data.data[0].points)
  setdta(zones.data.data[0].points)
  console.log("dta",dta)
})
console.log("from app",auth)
},[])
// localStorage.clear();

  return (
    <div style={{position:"relative"}}>
      {Auth_?    <Wrapper apiKey="AIzaSyBh88cacs9bn0xo9TWcaQMVZphSHYL_AmA">
<Map

  center={center}
  zoom={zoom}
  onClick={onClick}
  clicks={clicks}
>
  {clicks.map((pos, index) => (
    <Marker key={index} onClick={onClick} clicks={clicks}
      position={pos} remove={remove} INDEX={INDEX}
    />)

  )}

</Map>
 </Wrapper>:      <LoginPage checkAuthent={checkAuthent}/>
 }
   {clicks[0]===clicks[clicks.length-1]&&clicks.length>1?
   <div className="popUp">
     <form style={{display:"flex",
     marginRight:"5px",
     textAlign:"right",
     justifyContent:"space-around"
     ,flexDirection:"column"}}>
            <h3>أضف بيانات المنطقه</h3>
            <hr/>

       <label>أسم المنطقه</label>
       <input/>
       <label>أختر اللون</label>
       <input type="color"/>
       <button className="addRegions">أضف منطقه</button>
       <br/>
     </form>
   </div>:null}


      {/* {clicks.map((latLng, i) => {
        // let arr=[];
        // arr.push(JSON.stringify(latLng.toJSON()))
        //   console.log("xxxxxx=>>>",arr)
        return (
          <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>

        )
      }

      )} */}


    </div>
  )
}

export default App


/* <Wrapper apiKey="AIzaSyBh88cacs9bn0xo9TWcaQMVZphSHYL_AmA">
<Map
  center={center}
  zoom={zoom}
  onClick={onClick}
  clicks={clicks}
>
  {clicks.map((pos, index) => (
    <Marker key={index} onClick={onClick} clicks={clicks}
      position={pos} remove={remove} INDEX={INDEX}
    />)

  )}
  {/* {mohab.map((pos,index)=>(
<Polylines key={index} onClick={onClick} clicks={clicks}
position={pos}
/>))} */
// </Map>
// </Wrapper> */