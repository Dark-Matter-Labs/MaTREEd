const Tooltip = ({ closeTooltip, style, properties, openSimulator }) => {
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
    ["CO₂ stock ", Math.round(sum_c_stock)+ " kg"],
    ["CO₂ sequestration", Math.round(sum_c_seq)+ " kg/y"],
  ];
  return (
    <div style={style} className="tooltip">
      <div className="singleRow">
        <p>{NOMBRE}</p>
      </div>
      {treeData.map(([name, val]) => (
        <div className="row" key={name}>
          <p>{name}</p>
          <p>{val}</p>
        </div>
      ))}
      <div className="singleRow">
        <p>TREE SPECIES</p>
      </div>
      {treeSpecies.map(([name, val]) => (
        <div className="row" key={name}>
          <p>{name}</p>
          <p>{val}%</p>
        </div>
      ))}
      <div className="singleRow">
        <p>CO₂ PERFORMANCE</p>
      </div>
      {carbonInfo.map(([name, val]) => (
        <div className="row" key={name}>
          <p>{name}</p>
          <p>{val}</p>
        </div>
      ))}

      <p className="disclaimer">
        Carbon computation are based on approximate equations for demonstration
        purpose only. Results are not intended for analytical purposes.
      </p>
      <button className="blueButton goToSimulator" onClick={openSimulator}>
        Run Simulation
      </button>
      <button className="blueButton closeButton" onClick={closeTooltip}>
        Close
      </button>
    </div>
  );
};

export default Tooltip;
