  import * as React from "react";
  import { Wrapper, Status } from "@googlemaps/react-wrapper";
  import './App.css'
  import 'reactjs-popup/dist/index.css';
  import Modal from 'react-modal'
  import Map from "./Components/Map";
  import Marker from "./Components/Marker";
  import LoginPage from "./Components/Login/LoginPage";
  import axios from "axios";
  import Polyline from './Components/Polyline'
  const header = {
    headers: {
      'Accept': 'application/json',
      "Authorization": localStorage.getItem('Auth')
    },
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '28%',
      height: '210px',
      borderTop:"5px solid ",
      backgroundColor:"white"
    },
  };
  const App = () => {
    const center = { lat: 25.60190226111573, lng: 20.0390625 }
    const zoom = 4


    const [remove, setRemove] = React.useState<boolean>(false)
    const [clicks, setClicks] = React.useState<google.maps.LatLng[] | any>([]);
    var [dta, setdta] = React.useState([]);
    const [shapeLabel, setshapeLabel] = React.useState("");
    const [show_shape_Label, setShow_shape_Label] = React.useState(false);
    const [indexOfShape, setIndexOfShape] = React.useState();
    const [pointOf_shape,setPointOf_shape]=React.useState([])
    const [show_context_menu, set_show_context_menu] = React.useState<boolean>(false)
    const [editPoint, seteditPoint] = React.useState<boolean>(false)
    const [auth, setAuth] = React.useState<boolean>(false)
    const [is_f_Point, setFinalPoint] = React.useState<boolean>(false)
    const [show, setShow] = React.useState<boolean>(false)
    const [{ label, color }, setData] = React.useState({label: '',color: ''})
    const [INDEX, setIndex] = React.useState<google.maps.LatLng>()

    let polygon=[]
    const Auth_ = localStorage.getItem("Auth");
  


    const checkAuthent = (isAuth: boolean) => {
      setAuth(isAuth)
      console.log("authenticatrion", isAuth)
    };
    const closeModel = () => {
      setShow(false)
      seteditPoint(false)
    };
    const onClick = function (e: google.maps.MapMouseEvent) {
      if (e.latLng == clicks[0]) {

        var txt;
        if (window.confirm("remove a Shape?")) {
          txt = "You pressed OK!";
          setFinalPoint(true)
          return;
        }
       
        else {
          setShow(true)
        }
      }
      
      setShow_shape_Label(false)
      setClicks([...clicks, e.latLng]);
    };
    const Createzoone = (e) => {
      e.preventDefault()
  const coordinates=JSON.stringify(clicks)
      const newZone={
        label:label,
        color:color,
        points:JSON.parse(coordinates)
      }
      axios.post("https://zones-backend-halan.herokuapp.com/zones",newZone, header).then(res => {
        console.log(res.data)
        window.location.reload()

      })
    };
  const clickPoly=(index)=>{
    window.addEventListener("contextmenu",function(e:MouseEvent){
      e.preventDefault();
      set_show_context_menu(true)
      var contextElement=document.getElementById("context_menu");
      contextElement.style.top=e.offsetY+"px"
        contextElement.style.left=e.offsetX+"px";
    })
  
    setShow_shape_Label(true)
    setshapeLabel(dta[index].label)
    setIndexOfShape(dta[index]._id)
    setPointOf_shape(dta[index].points)
  }
  const RemoveShape=()=>{
    axios.delete(`https://zones-backend-halan.herokuapp.com/zones/${indexOfShape}`,header).then(
      res=>{
        console.log(res.data)
        window.location.reload()

      }
    )
  }
const edit_Point=()=>{
  seteditPoint(true)
  document.getElementById("context_menu").style.display="none"

}

  const EditShape=(e)=>{
    e.preventDefault()
    const coordinates=JSON.stringify(pointOf_shape)
        const editZone={
          label:label,
          color:color,
          points:JSON.parse(coordinates)
        }
    axios.put(`https://zones-backend-halan.herokuapp.com/zones/${indexOfShape}`,editZone,header).then(
      res=>{
        console.log(res.data)
        window.location.reload()

      }
    )

  }

    React.useEffect(() => {
      axios.get("https://zones-backend-halan.herokuapp.com/zones", header).then(zones => {
      
        for(let i=0;i<zones.data.data.length;i++){
          for(let x=0;x<zones.data.data[i].points.length;x++)
          {
            let obj={lat:JSON.parse(zones.data.data[i].points[x].lat),lng:JSON.parse(zones.data.data[i].points[x].lng)}
        polygon.push(obj)
          }
          zones.data.data[i].points=polygon
          polygon=[];
        }
        let zoones = zones.data.data
        console.log("allShapes",zones.data.data)
        setdta(zones.data.data)
  })

    
    }, [])


    
    return (
      <div style={{ position: "relative" }}>
        {Auth_ ? <Wrapper apiKey="AIzaSyBh88cacs9bn0xo9TWcaQMVZphSHYL_AmA">

          <Map
        

            center={center}
            zoom={zoom}
            onClick={onClick}
            clicks={clicks}
            
          >
            {clicks.map((pos, index) => (
              <Marker key={index} onClick={onClick} clicks={clicks} 
                position={pos} remove={remove} INDEX={INDEX} is_f_Point={is_f_Point}
              />)

            )}

  {dta.map((coord,index)=> <Polyline key={index} position={coord.points} color={coord.color} getClick={(index)=>clickPoly(index)} INDEX={index} allDta={dta}/>)}

          </Map>
        </Wrapper> : <LoginPage checkAuthent={checkAuthent} />
        }

  {show_shape_Label?<div className="popUp"><p>{shapeLabel}</p></div>:null}
 {show_context_menu? <div id="context_menu">
    <h4 className="remov_edit"  onClick={RemoveShape}>remove</h4><h4>,</h4>
    <h4 className="remov_edit" onClick={edit_Point}>edite</h4>

  </div>:null}

        <Modal
          isOpen={show}
          // onRequestClose={show}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <form style={{
            display: "flex",
            marginRight: "5px",
            textAlign: "right",
            justifyContent: "space-around"
            , flexDirection: "column"
          }}>
            {/* <span onClick={closeModel} style={{cursor:"pointer"}}> x</span> */}
            <h3 style={{ borderBottom: '1px solid gray', cursor: 'progress' }}>أضف بيانات المنطقه</h3>
            <div style={{display: "flex",flexDirection: "column"}}>
  <div style={{display:'flex',justifyContent:"space-around"}}>
            <input
            style={{backgroundColor:"gainsboro",outline:"none",border:"1px solid white"}}
            required
              value={label} onChange={(event) => setData({
                label: event.target.value,
                color
              })} />
                        <label style={{flex:"auto",color:"gray"}}>أسم المنطقه</label>

              </div>
              <div style={{display:'flex',justifyContent:"space-around",    marginTop: "10px"}} >
          <div style={{width: "173px",backgroundColor: "gainsboro",display: "flex",border: "1px solid white",   height: "22px"
}}>
            <input type="color"
            required
            style={{height:"22px"}}
              value={color} onChange={(event) => setData({
                label,
                color: event.target.value
              })}
            />
           <span> {color}</span>
            </div>
                      <label style={{flex:"auto",color:"gray"}}>أختر اللون</label>

            </div>
            </div>
            <button onClick={Createzoone} className="addRegions">أضف منطقه</button>
            <br />
          </form>
        </Modal>

        <Modal
          isOpen={editPoint}
          // onRequestClose={show}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <form style={{
            display: "flex",
            marginRight: "5px",
            textAlign: "right",
            justifyContent: "space-around"
            , flexDirection: "column"
          }}>
            <span onClick={closeModel} style={{cursor:"pointer"}}> x</span>
            <h3 style={{ borderBottom: '1px solid gray', cursor: 'progress' }}>أضف بيانات المنطقه</h3>
            <div style={{display: "flex",flexDirection: "column"}}>
  <div style={{display:'flex',justifyContent:"space-around"}}>
            <input
            style={{backgroundColor:"gainsboro",outline:"none",border:"1px solid white"}}
            required
              value={label} onChange={(event) => setData({
                label: event.target.value,
                color
              })} />
                        <label style={{flex:"auto",color:"gray"}}>أسم المنطقه</label>

              </div>
              <div style={{display:'flex',justifyContent:"space-around",    marginTop: "10px"}} >
          <div style={{width: "173px",backgroundColor: "gainsboro",display: "flex",border: "1px solid white",   height: "22px"
}}>
            <input type="color"
            required
            style={{height:"22px"}}
              value={color} onChange={(event) => setData({
                label,
                color: event.target.value
              })}
            />
           <span> {color}</span>
            </div>
                      <label style={{flex:"auto",color:"gray"}}>أختر اللون</label>

            </div>
            </div>
            <button onClick={EditShape} className="addRegions">تعديل المنطقه </button>
            <br />
          </form>
        </Modal>
        {/* {clicks.map((latLng, i) => {

          return (
            <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>

          )
        }

        )} */}

      </div>
    )
  }

  export default App


