import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react";


function Map(
  { center, zoom, children, onClick, clicks }:
    {
      center: google.maps.LatLngLiteral,
      zoom
      clicks: google.maps.LatLng[],
      children: ReactNode,
      onClick?: (e: google.maps.MapMouseEvent) => void
    }) {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const ref = useRef<HTMLDivElement>();
  const style = { height: "100vh" };


  const flightPathCoordinates = clicks

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current!, {gestureHandling:"cooperative"}))
  }, [])
  if (map) {
    map.setCenter(center)
    map.setZoom(zoom)
  }
  useEffect(() => {
    if (map) {
      ["click"].forEach((eventName) => {
        google.maps.event.clearListeners(map, eventName)
        if (onClick) {
          map.addListener("click", onClick);
        }
      });
    }
  }, [map, onClick]);

  return <div ref={ref} style={style}>
    {React.Children.map(children, (child: ReactElement) =>
      React.cloneElement(child, { map })
    )}
  </div>
}
export default Map