import { useEffect, useState } from "react";
let flightPath: google.maps.Polyline;
let polygon: google.maps.Polygon;

type MarkerStruct = {
    position: google.maps.LatLng,
    map?: google.maps.Map,
    onClick?: (e: google.maps.MapMouseEvent) => void,
    clicks: google.maps.LatLng[],
    remove: boolean,
    INDEX: google.maps.LatLng,
    is_f_Point: boolean
}
function Marker({ position, map, onClick, clicks, remove, INDEX, is_f_Point }: MarkerStruct) {
    function addline() {
        flightPath.setMap(map)
    }

    function addColor() {
        polygon.setMap(map)
    }
    flightPath = new google.maps.Polyline({
        path: clicks,
        strokeColor: "#000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        clickable: true
    });
    polygon = new google.maps.Polygon({
        paths: clicks,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#000",
        fillOpacity: 0.35,
    });

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

                if (is_f_Point) {
                    window.location.reload()
                    polygon.setMap(null)
                    flightPath.setMap(null)
                    return;
                }
                else {
                    marker.addListener("click", onClick);
                    map.addListener("click", addline);
                    marker.addListener("click", addColor)
                }

            }
        }
    }, [marker, onClick, addColor, remove, clicks]);

    return null
}
export default Marker