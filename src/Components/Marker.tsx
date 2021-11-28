import { useEffect, useState } from "react";
let flightPath: google.maps.Polyline;
let polygon: google.maps.Polygon;

type MarkerStruct ={
    position: google.maps.LatLng,
    map?: google.maps.Map,
    onClick?: (e: google.maps.MapMouseEvent) => void,
    clicks: google.maps.LatLng[],
    remove: boolean,
    INDEX: google.maps.LatLng
}
function Marker({ position, map, onClick, clicks, remove, INDEX }:MarkerStruct) {
    function addline() {
        flightPath.setMap(map)
    }
    function removeLine(index) {
        flightPath.setMap(null);
        flightPath.getPath().removeAt(index);
        flightPath.setPath(clicks);
        flightPath.setMap(map);
    }
    function addColor() {
        polygon.setMap(map)
    }
    flightPath= new google.maps.Polyline({
        strokeColor: "#000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        clickable: true
    });
     polygon =  new google.maps.Polygon({
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#000",
        fillOpacity: 0.35,
    });
    polygon.setPaths(clicks);
    flightPath.setPath(clicks);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null)
    useEffect(() => { setMarker(new google.maps.Marker()) }, [])
    if (marker) {
        marker.setMap(map)
        marker.setPosition(position)
    }
    useEffect(() => {
        if (marker) {
            ["click"].forEach((addline) => {
                google.maps.event.clearListeners(marker, addline)
            })
            if (onClick) {
                marker.addListener("click", onClick);
                if (!remove) {
                    map.addListener("click", addline);
                    marker.addListener("click", addColor)
                }
                if (remove) {
                    removeLine(INDEX)
                }
                marker.addListener("click", addColor)
            }
        }
    }, [marker, addline, onClick, addColor, remove, clicks, removeLine]);

    return null
}
export default Marker