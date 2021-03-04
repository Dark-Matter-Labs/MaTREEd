import legends from "../static/legends";

const Legend = ({ legendValue, setLegendValue }) => {
  const legendItem = legends?.[legendValue]?.label;
  const colorMap = legends?.[legendValue]?.colorMap;
  const len = legends?.[legendValue]?.colorMap.length;

  return (
    <div className="legendContainer">
      <div>
        <h2>MAPS</h2>
      </div>
      <div className="legendTitle">{legendItem}</div>
      <div className="selectedLegend">
        {colorMap?.map((item, index) => (
          <div key={index}>
            <div className="legendVal">
              {`${new Intl.NumberFormat().format(colorMap[len-index + 1-1]?.[0] || 0)}-${new Intl.NumberFormat().format(colorMap[len-index-1][0])}`}
            </div>
            <div
              className="legendColor"
              style={{ backgroundColor: colorMap[len-index-1][1] || item[0] }}
            />
          </div>
        ))}
      </div>
      {Object.entries(legends).map(
        (item) =>
          item[0] !== legendValue && (
            <div
              key={item[1].label}
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

const getColorForLegend = (val, colorMap) => {
  if (!colorMap) {
    return;
  }
  const colorItem = colorMap.find((item) => val > item[0]);

  return colorItem && colorItem[1]
    ? colorItem[1]
    : colorMap[colorMap.length - 1][1];
};

export { getColorForLegend };
export default Legend;
