const legends = {
    tree_tot_n: {
      label: "Tree density [trees/km²]",
      colorMap:[
         [7566, '#00441b'],
         [4090, '#2a924a'],
         [3147, '#7bc87c'],
         [2473, '#caeac3'],
         [1761, '#f7fcf5'],
      ]
    },
    avg_trunk_girth: {
      label: "Mean tree trunk girth [m]",
      colorMap:[
        [0.943, '#a6611a'],
        [0.751, '#dfc27d'],
        [0.677, '#f5f5f5'],
        [0.625, '#80cdc1'],
        [0.55, '#018571'],
      ]
    },
    avg_height: {
      label: "Mean tree height [m]",
      colorMap:[
        [11.6, '#bd0026'],
        [9.18, '#f03b20'],
        [8.41, '#fd8d3c'],
        [7.71, '#fecc5c'],
        [6.93, '#ffffb2'],
      ]
    },
    avg_crown_diameter: {
      label: "Mean tree canopy diameter [m]",
      colorMap:[
        [7.26, '#810f7c'],
        [5.61, '#8856a7'],
        [5.19, '#8c96c6'],
        [4.7,  '#b3cde3'],
        [4.02, '#edf8fb'],
      ]
    },
    tree_cover: {
      label: "Tree canopy coverage [area %]",
      colorMap:[
        [23.4, '#006837'],
        [11.8, '#31a354'],
        [8.7, '#78c679'],
        [5.8, '#c2e699'],
        [2.8, '#ffffcc'],
      ]
    },
    sum_c_stock_n: {
      label: "CO₂ stock [kg/km²]",
      colorMap: [
        [4040511, '#440154'],
        [1516593, '#3a528b'],
        [1143824, '#20908d'],
        [814971, '#5dc962'],
        [423571, '#fde725'],
      ],
    },
    sum_c_seq_n: {
      label: "CO₂ sequestration [kg/y/km²]",
      colorMap: [
        [152135, '#d7191c'],
        [61540, '#fdae61'],
        [46681, '#ffffbf'],
        [34481, '#abdda4'],
        [17924, '#2b83ba'],
      ],
    },
  };

  export default legends;
