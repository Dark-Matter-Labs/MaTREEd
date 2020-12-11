import "./App.css";
import { MapContainer, TileLayer, GeoJSON, MapConsumer } from "react-leaflet";
import data from "./app_data/neighborhoods_madrid_stats.json";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const madridCenter = [40.475, -3.7];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Simulator = () => {
  let query = useQuery();
  const id = query.get("id");
  const [currentJSON, setCurrentJSON] = useState(data);
  const currentJSONRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (id) {
      const fileName = `MaTREEd/app_data/trees_neighbours/T_CODBARRIO_${id}.json`;
      console.log(fileName);
      fetch(fileName)
        .then(res => res.json())
        .then(data => {
          setCurrentJSON(data);
          if (currentJSONRef.current) {
            const bounds = currentJSONRef.current.getBounds();
            console.log(bounds);
            mapRef.current.fitBounds(bounds);
          }
        });
    }
  }, [id]);
  return (
    <div id="container">
      <div className="pageName">
        MaTREEd Simulator
        <Link to="/">
          <button className="blueButton linkButton">Go to Viewer</button>
        </Link>
      </div>
      <MapContainer
        id="mapContainer"
        center={madridCenter}
        zoom={11}
        scrollWheelZoom={false}
      >
        <MapConsumer>
          {map => {
            mapRef.current = map;
            return (
              <>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON
                  ref={currentJSONRef}
                  onEachFeature={layer => {}}
                  eventHandlers={{
                    click: async e => {
                      console.log(
                        "marker clicked",
                        e.layer?.feature?.properties?.CODBARRIO
                      );

                      const CODBARRIO = e.layer?.feature?.properties?.CODBARRIO;
                      if (!CODBARRIO) {
                        return;
                      }
                      const fileName = `MaTREEd/app_data/trees_neighbours/T_CODBARRIO_${CODBARRIO}.json`;

                      fetch(fileName)
                        .then(res => res.json())
                        .then(data => {
                          setCurrentJSON(data);
                          if (currentJSONRef.current) {
                            const bounds = currentJSONRef.current.getBounds();
                            console.log(bounds);
                            map.fitBounds(bounds);
                          }
                        });
                    }
                  }}
                  key={currentJSON.name}
                  data={currentJSON}
                />
              </>
            );
          }}
        </MapConsumer>
      </MapContainer>
    </div>
  );
};
export default Simulator;
