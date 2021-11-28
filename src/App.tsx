import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './App.css'
import Popup from 'reactjs-popup';
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
    height: '242px'
  },
};
const App = () => {
  const center = { lat: 25.60190226111573, lng: 20.0390625 }
  const zoom = 4
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
  };
  const [remove, setRemove] = React.useState<boolean>(false)
  const [clicks, setClicks] = React.useState<google.maps.LatLng[] | any>([]);
  var [dta, setdta] = React.useState([]);
  console.log("my xnxx", dta)
  const [auth, setAuth] = React.useState<boolean>(false)
  const [is_f_Point, setFinalPoint] = React.useState<boolean>(false)
  const [show, setShow] = React.useState<boolean>(false)

  const [{ label, color }, setData] = React.useState({
    label: '',
    color: ''
  })
  const [INDEX, setIndex] = React.useState<google.maps.LatLng>()

  const checkAuthent = (isAuth: boolean) => {
    setAuth(isAuth)
    console.log("authenticatrion", isAuth)
  }
  const closeModel = () => {
    setShow(false)
  }
  const onClick = function (e: google.maps.MapMouseEvent) {
    if (e.latLng == clicks[0]) {
      var txt;
      if (window.confirm("remove a polygon?")) {
        txt = "You pressed OK!";
        setFinalPoint(true)
        console.log("clicks from app", clicks)
        return;
      }
      else {
        setShow(true)
      }
    }
    setClicks([...clicks, e.latLng]);
  };
  const Auth_ = localStorage.getItem("Auth");

  React.useEffect(() => {
    axios.get("https://zones-backend-halan.herokuapp.com/zones", header).then(zones => {
      let x = zones.data.data[0]
      delete x["_id"]
      setdta(x)

    })
  }, [label, color])
  const Createzoone = (e) => {
    e.preventDefault()
    axios.post("https://zones-backend-halan.herokuapp.com/zones", { label, color, clicks }, header).then(res => {
      console.log(res.data)
    })
  }
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


        </Map>
      </Wrapper> : <LoginPage checkAuthent={checkAuthent} />
      }


      <Modal
        isOpen={show}
        onRequestClose={show}
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
          <span onClick={closeModel}> x</span>
          <h3 style={{ borderBottom: '1px solid black', cursor: 'progress' }}>أضف بيانات المنطقه</h3>

          <label>أسم المنطقه</label>
          <input
            value={label} onChange={(event) => setData({
              label: event.target.value,
              color
            })} />
          <label>أختر اللون</label>
          <input type="color"
            value={color} onChange={(event) => setData({
              label,
              color: event.target.value
            })}
          />
          <button onClick={Createzoone} className="addRegions">أضف منطقه</button>
          <br />
        </form>
      </Modal>
      {clicks.map((latLng, i) => {

        return (
          <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>

        )
      }

      )}


    </div>
  )
}

export default App


