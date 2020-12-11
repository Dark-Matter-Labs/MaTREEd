import { useState, useEffect } from "react";
import "./App.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import data from "./app_data/neighborhoods_madrid_stats.json";
import { Link } from "react-router-dom";
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
    NOMBRE
  } = properties;

  const treeData = [
    ["TREES COUNT", tree_tot],
    ["VALID TREE RECORDS", tree_valid + "%"],
    ["EVERGREEN", perc_perennifolio + "%"],
    ["DECIDUOUS", perc_caducifolio + "%"]
  ];

  const treeSpecies = [
    [especie_1, especie_1_perc],
    [especie_2, especie_2_perc],
    [especie_3, especie_3_perc],
    ["others", other_perc]
  ];

  const carbonInfo = [
    ["CO2 stock ", Math.round(sum_c_stock * 100) / 100 + " Kg"],
    ["CO2 sequestration", Math.round(sum_c_seq * 100) / 100 + " Kg/y"]
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
        <p>CO2 PERFORMANCE</p>
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
  //   Titolo Mappa (nome campo)

  const legends = [
    // ["Trees density [trees/Km2]", "tot_trees_n"],
    // ["Mean trees trunk perimeter [m]", "avg_perimetro"],
    // ["Mean trees height [m]", "avg_altura"],
    // ["Mean trees canopy diameter [m]", "avg_diametro_copa"],
    // ["Trees canopy coverage [area %]", "tree_cover"],
    ["CO2 stock [Kg/Km2]", "sum_c_stock"],
    ["CO2 sequestration [Kg/y/Km2]", "sum_c_stock_n"]
  ];


  const legendItem = legends.find(item=>item[1]===legendValue)

  return (
    <div className="legendContainer">
      <p>Legend - {legendItem?.[0]} </p>
      <p>
        <div className='legendVal'>> 200000</div>
        <div className='legendColor'
          style={{ backgroundColor: "#800026" }}
        />
      </p>
      <p>
        <div className='legendVal'>> 250000</div>
        <div className='legendColor'
          style={{ backgroundColor: "#BD0026" }}
        />
      </p>
      <p>
      <div className='legendVal'>> 200000</div>
      <div className='legendColor'
       style={{ backgroundColor: "#E31A1C" }} />
      </p>
      <p>
        <div className='legendVal'>> 100000</div>
        <div className='legendColor'
          style={{ backgroundColor: "#FC4E2A" }}
        />
      </p>
      <p>
        <div className='legendVal'>> 50000</div>
        <div className='legendColor'
          style={{ backgroundColor: "#FD8D3C" }}
        />
      </p>
      <p>
        <div className='legendVal'>> 20000</div>
        <div className='legendColor'
          style={{ backgroundColor: "#FEB24C" }}
        />
      </p>
      <p>
        <div className='legendVal'>0-20000</div>
        <div className='legendColor'
          style={{ backgroundColor: "#FED976" }}
        />
      </p>
      <div>Other legends</div>
      {legends.map(item=> item[1]!==legendValue &&  (
        <div className='otherLegend' onClick={()=>setLegendValue(item[1])}>
          {item[0]}
        </div>
      ))}
    </div>
  );
};

function getColor(d) {
  return d > 300000
    ? "#800026"
    : d > 200000
    ? "#BD0026"
    : d > 250000
    ? "#E31A1C"
    : d > 200000
    ? "#FC4E2A"
    : d > 100000
    ? "#FD8D3C"
    : d > 50000
    ? "#FEB24C"
    : d > 20000
    ? "#FED976"
    : "#FFEDA0";
}

const App = () => {
  const [legendValue, setLegendValue] = useState("sum_c_stock");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [properties, setProperties] = useState(null);
  const [layerH, setLayerH] = useState(null);
  const left = tooltipVisible ? "0px" : "-100%";

  const getStyle = ( val) =>({
    fillColor: getColor(val),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7
  })

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
          style={feature=>getStyle(feature.properties[legendValue])}
          onEachFeature={layer => {}}
          eventHandlers={{
            click: async e => {
              console.log("marker clicked", e.layer.feature);
              setProperties(e.layer.feature.properties);
              setLayerH(e.layer.feature);
              setTooltipVisible(true);
            }
          }}
          key={"madrid"+legendValue}
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
