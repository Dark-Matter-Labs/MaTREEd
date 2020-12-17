import { useState, useEffect } from "react";
import "./App.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import data from "./app_data/neighborhoods_madrid_stats.json";
import { Link } from "react-router-dom";
import legends from "./static/legends";

const madridCenter = [40.475, -3.7];

const Tooltip = ({ closeTooltip, style, properties }) => {
  if (!properties) {
    return null;
  }
  const {
    perc_caducifolio,
    perc_perennifolio,
    tree_valid,
    tree_tot,
    especie_1,
    especie_1_perc,
    especie_2,
    especie_2_perc,
    especie_3,
    especie_3_perc,
    other_perc,
    sum_c_stock,
    sum_c_seq,
    CODBARRIO,
    NOMBRE,
  } = properties;

  const treeData = [
    ["TREES COUNT", tree_tot],
    ["VALID TREE RECORDS", tree_valid + "%"],
    ["EVERGREEN", perc_perennifolio + "%"],
    ["DECIDUOUS", perc_caducifolio + "%"],
  ];

  const treeSpecies = [
    [especie_1, especie_1_perc],
    [especie_2, especie_2_perc],
    [especie_3, especie_3_perc],
    ["others", other_perc],
  ];

  const carbonInfo = [
    ["CO₂ stock ", Math.round(sum_c_stock * 100) / 100 + " Kg"],
    ["CO₂ sequestration", Math.round(sum_c_seq * 100) / 100 + " Kg/y"],
  ];
  return (
    <div style={style} className="tooltip">
      <div className="singleRow">
        <p>{NOMBRE}</p>
      </div>
      {treeData.map(([name, val]) => (
        <div className="row">
          <p>{name}</p>
          <p>{val}</p>
        </div>
      ))}
      <div className="singleRow">
        <p>TREE SPECIES</p>
      </div>
      {treeSpecies.map(([name, val]) => (
        <div className="row">
          <p>{name}</p>
          <p>{val}%</p>
        </div>
      ))}
      <div className="singleRow">
        <p>CO₂ PERFORMANCE</p>
      </div>
      {carbonInfo.map(([name, val]) => (
        <div className="row">
          <p>{name}</p>
          <p>{val}</p>
        </div>
      ))}
      {/* <Link to={`/simulator?id=${CODBARRIO}`}>
      <button className='blueButton goToSimulator'>View in Simulator</button>
    </Link> */}
      <button className="blueButton closeButton" onClick={closeTooltip}>
        Close
      </button>
    </div>
  );
};

const Legend = ({ legendValue, setLegendValue }) => {
  const legendItem = legends?.[legendValue]?.label;
  const colorMap = legends?.[legendValue]?.colorMap;

  return (
    <div className="legendContainer">
      <div>
        <h2>MAPS</h2>
      </div>
      <div className="legendTitle">{legendItem}</div>
      {colorMap?.map((item, index) =>(
        <p>
          <div className="legendVal">
            {`${colorMap[index][0]}-${colorMap[index + 1]?.[0] || 0}`}
          </div>
          <div className="legendColor" style={{ backgroundColor: item[1]||item[0] }} />
        </p>
      ))}
      {Object.entries(legends).map(
        (item) =>
          item[0] !== legendValue && (
            <div
              className="legendTitle otherLegend"
              onClick={() => setLegendValue(item[0])}
            >
              {item[1].label}
            </div>
          )
      )}
    </div>
  );
};

function getColorForLegend(val, colorMap) {
  if (!colorMap) {
    return;
  }

  const colorItem = colorMap.find((item) => val > item[0]);
  
  return (colorItem && colorItem[1]) ? colorItem[1] : colorMap[colorMap.length - 1][1];
}

const App = () => {
  const [legendValue, setLegendValue] = useState("sum_c_stock");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [properties, setProperties] = useState(null);
  const [layerH, setLayerH] = useState(null);
  const left = tooltipVisible ? "0px" : "-100%";

  const getStyle = (val, colorMap) =>
    ({
      fillColor: getColorForLegend(val, colorMap),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    });

  return (
    <div id="container">
      <div className="pageName">
        MaTREEd Viewer
        <Link to="/simulator">
          <button className="blueButton linkButton">Go to Simulator</button>
        </Link>
      </div>
      <Legend legendValue={legendValue} setLegendValue={setLegendValue} />
      <Tooltip
        properties={properties}
        style={{ left: left }}
        closeTooltip={() => setTooltipVisible(false)}
      />

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
              console.log("marker clicked", e.layer.feature);
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
