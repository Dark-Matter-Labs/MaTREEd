const legends = {
    tot_trees_n: {
      label: "Trees density [trees/Km2]",
    },
    avg_perimetro: {
      label: "Mean trees trunk perimeter [m]",
    },
    avg_altura: {
      label: "Mean trees height [m]",
    },
    avg_diametro_copa: {
      label: "Mean trees canopy diameter [m]",
    },
    tree_cover: {
      label: "Trees canopy coverage [area %]",
    },
    sum_c_stock: {
      label: "CO₂ stock [Kg/Km2]",
      colorMap: [
        [300000, "#800026"],
        [200000, "#BD0026"],
        [250000, "#E31A1C"],
        [200000, "#FC4E2A"],
        [100000, "#FD8D3C"],
        [50000, "#FEB24C"],
        [20000, "#FED976"],
        ["#FFEDA0"],
      ],
    },
    sum_c_stock_n: {
      label: "CO₂ sequestration [Kg/y/Km2]",
      colorMap: [
        [300000, "#800026"],
        [200000, "#BD0026"],
        [250000, "#E31A1C"],
        [200000, "#FC4E2A"],
        [100000, "#FD8D3C"],
        [50000, "#FEB24C"],
        [20000, "#FED976"],
        ["#FFEDA0"],
      ],
    },
  };

  export default legends;