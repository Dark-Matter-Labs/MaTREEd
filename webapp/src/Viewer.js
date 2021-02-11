import { useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import data from "./app_data/neighborhoods_madrid_stats.json";
import Legend, { getColorForLegend } from "./components/Legend";
import Tooltip from "./components/Tooltip";
import Simulator from "./components/Simulator";
import legends from "./static/legends";
import info from "./static/info.png";

const madridCenter = [40.475, -3.7];

const App = () => {
  const [legendValue, setLegendValue] = useState("sum_c_stock_n");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [properties, setProperties] = useState(null);
  const [layerH, setLayerH] = useState(null);
  const [simulatorVisible, setSimulatorVisible]= useState(false);

  const left = tooltipVisible ? "0px" : "-100%";

  let totalCO2stock = 0, totalCO2seq = 0;

  const getStyle = (val, colorMap) => ({
    fillColor: getColorForLegend(val, colorMap),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  });

  const computeTotal = (data) => {
    data.features.map(x => {
      totalCO2stock+= x.properties.sum_c_stock;
      totalCO2seq+= x.properties.sum_c_seq;
    });
  }

  computeTotal(data);

  return (
    <div id="container">
      <div className="pageName">MaTREEd - Tree Information System for Madrid neighborhoods
      <a target='_blank' href='https://github.com/GISdevio/MaTREEd/blob/main/project-description.md'><img className='info' src={info} /></a>
      </div>
      <Legend legendValue={legendValue} setLegendValue={setLegendValue} />
      Total CO₂ stock: {Math.round(totalCO2stock)} kg <br />
      Total CO₂ sequestration: {Math.round(totalCO2seq)} kg/y
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
