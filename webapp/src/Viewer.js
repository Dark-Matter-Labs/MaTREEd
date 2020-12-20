import { useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import data from "./app_data/neighborhoods_madrid_stats.json";
import Legend, { getColorForLegend } from "./components/Legend";
import Tooltip from "./components/Tooltip";
import Simulator from "./components/Simulator";
import legends from "./static/legends";

const madridCenter = [40.475, -3.7];

const App = () => {
  const [legendValue, setLegendValue] = useState("sum_c_stock");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [properties, setProperties] = useState(null);
  const [layerH, setLayerH] = useState(null);
  const [simulatorVisible, setSimulatorVisible]= useState(false);

  const left = tooltipVisible ? "0px" : "-100%";

  const getStyle = (val, colorMap) => ({
    fillColor: getColorForLegend(val, colorMap),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  });

  return (
    <div id="container">
      <div className="pageName">MaTREEd Viewer</div>
      <Legend legendValue={legendValue} setLegendValue={setLegendValue} />
      <Tooltip
        properties={properties}
        style={{ left: left }}
        closeTooltip={() => setTooltipVisible(false)}
        openSimulator={()=>setSimulatorVisible(true)}
      />
      <Simulator 
      properties={properties}
      visible={simulatorVisible} 
      onClose={()=>setSimulatorVisible(false)} />

      <MapContainer
        id="mapContainer"
        center={madridCenter}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          style={(feature) =>
            getStyle(
              feature.properties[legendValue],
              legends?.[legendValue]?.colorMap
            )
          }
          onEachFeature={(layer) => {}}
          eventHandlers={{
            click: async (e) => {
              setProperties(e.layer.feature.properties);
              setLayerH(e.layer.feature);
              setTooltipVisible(true);
            },
          }}
          key={"madrid" + legendValue}
          data={data}
        />
        {tooltipVisible && layerH && (
          <GeoJSON
            pathOptions={{ color: "red" }}
            key={layerH.properties.NOMBRE}
            data={layerH}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default App;
