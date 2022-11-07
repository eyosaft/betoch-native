import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const acctok =
  "pk.eyJ1IjoiZXlvc2FmdCIsImEiOiJjbDdoZTI2eW0wZGx2NDBsOWkwZWc4dnVjIn0.jwI1K4KGcod27XcI6EJJMQ";

mapboxgl.accessToken = acctok;

const Map = ({ plng, plat }) => {
  const mapContainer = useRef();
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [data, setData] = useState();
  const [value, setValue] = React.useState("");

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [plng, plat],
      pitch: 70, // pitch in degrees
      bearing: -60, // bearing in degrees
      zoom: 16,
    });

    var marker = new mapboxgl.Marker();

    function add_marker() {
      setLng(plng);
      setLat(plat);

      marker.setLngLat([plng, plat]).addTo(map);
    }
    map.addControl(new mapboxgl.NavigationControl());
    add_marker();

    return () => map.remove();
  }, []);

  return (
    <>
      <div ref={mapContainer} style={{ width: "100%", height: "65vh" }}></div>
      lat{lat} lng{lng} {data}
    </>
  );
};

export default Map;
