# MaTREEd - Project description

## Table of Contents

* [Introduction & policy context](#introduction)
* [Datasets](#datasets)
* [Methodology](#methodology)
* [Webapp](#webapp)
* [Conclusions](#conclusions)


## Introduction & policy context <a name="introduction"></a>

xxxx


## Datasets <a name="datasets"></a>

MaTREEd is developed using the following datasets:

* **trees in Madrid**, downloaded from the challenge webpage on trees and including all the trees managed by the Municipality of Madrid, excluding trees in parks and gardens, areas of property or areas of recent construction not yet received by the Municipality. The dataset, which overall consists of 655’650 trees (point features), is provided by Madrid City Council under this license, which allows the reuse for commercial and non-commercial purposes, and is available on the open data portal of Madrid. The dataset is used as input to calculate and simulate the tree carbon stock for each neighbourhood (see the Methodology section);

* **neighbourhoods in Madrid**, downloaded from the challenge webpage on administrative units and including the 131 neighbourhoods (polygon features) in which Madrid is divided. The dataset is provided by Madrid City Council under this license, which allows the reuse for commercial and non-commercial purposes, and is available on the open data portal of Madrid. The dataset is used as the areal unit for the calculation and simulation of the tree carbon stock for each neighbourhood (see the Methodology section);

* **OpenStreetMap**, the geospatial database of the whole world created and managed by volunteers and available under the ODbL license. The OpenStreetMap database is not used directly (i.e. as single geospatial features), but through map tiles (in particular the standard tile layer) used as the basemap in the MaTREEd web application. 


## Methodology <a name="methodology"></a>

To be used in MaTREEd web application, the datasets of trees and neighbourhoods in Madrid are processed to achieve the following: 1) cleaning; 2) intersection with the dataset of neighbourhoods in Madrid and calculation of tree summary statistics for each neighbourhood; and 3) calculation of the tree carbon stock and sequestration rate for each neighbourhood. Each of these three steps is described in the following.

1. Through a sequence of pre-processing steps, the dataset of trees in Madrid is cleaned by:

  * removing all the features (trees) having NaN values for the attributes `senescence`, `crown_diameter`, `height` and `trunk_girth`, which are the attributes used for computing the neighbourhood statistics and the tree carbon indicators (see below); 
  * removing coarse outliers by filtering out extreme values for the attributes `crown_diameter`, `height` and `trunk_girth` using percentiles;

2. The datasets of trees and neighbourhoods in Madrid are spatially joined in order to add the neighbourhood information to each tree. This allows to compute the following tree summary statistics – corresponding to the maps shown in the web application – for each neighbourhood, as follows:

  * **Tree density** [trees/km2] (`tree_density`): number of trees per km2
  * **Mean tree trunk girth** [m] (`mean_trunk_girth`): mean value of the `trunk girth` of the available trees
  * **Mean tree height** [m] (`mean_tree_height`): mean value of the `height` of the available trees
  * **Mean tree canopy diameter** [m] (`mean_crown_diameter`): mean value of the `crown_diameter` of the available trees
  * **Tree canopy coverage** [%] (`tree_coverage`): percentage of the neighbourhood area covered by trees, computed as `mean_crown_diameter*𝜋/neighbourhood_area`, where `neighbourhood area` is the area of the neighbourhood
  * **Fractions of deciduous and evergreen trees** [%] (`fraction_deciduous`) and (`fraction_evergreen`): percentage of deciduous and evergreen trees of the total number of available trees (`trees_count`).
  * **Tree species** (`tree_species`): the percentages of occurrence of the three most popular tree species, and the percentage of occurrence of all the other tree species (considered together)

3. The tree carbon stock and sequestration rate for each neighbourhood are computed as the sum of the CO<sub>2</sub> stocked and the CO<sub>2</sub> sequestration rate contributed by each single tree available in the neighbourhood. In turn, these are computed using simplified [allometric equations](https://en.wikipedia.org/wiki/Tree_allometry) based on the tree diameter (`diameter`), the `trunk_girth` and the value of the `senescence` attribute - distinguishing between deciduous trees (value `CADUCIFOLIO`) and evergreen trees (value `PERENNIFOLIO`) - as follows:

* **CO<sub>2</sub> stock** [Kg] (`stock`):

```
if senescence == PERENNIFOLIO
    stock = (0.16155*((trunk_girth/𝜋)*100)^2.310647)*0.5*3.67
if senescence == CADUCIFOLIO
    stock = (0.035702*((trunk_girth/𝜋)*100)^2.580671)*0.5*3.67
```

where `0.5` is the fraction of the average carbon content on the tree’s dry weight total volume and `3.67` is the ratio of CO<sub>2</sub> to C (`44/12 = 3.67`) (see [here](https://www.ecomatcher.com/how-to-calculate-co2-sequestration/)). These equations are presented and explained in [this scientific paper](https://www.fs.fed.us/psw/publications/mcpherson/psw_2011_mcpherson009.pdf). 

* **CO<sub>2</sub> sequestration** [Kg/y] (`sequestration`): 

```
diameter_t0 = (trunk_girth_t0/𝜋)*100
diameter_t1 = diameter_t0 + (-0.5425 + 0.3189*ln((trunk_girth_t0/𝜋)*100))
sequestration = stock(t1) - stock(t0)
```

where `diameter_t0` and `diameter_t1` are the initial diameter of the tree and the diameter of the tree after one year, respectively; `trunk_girth_t0` is the initial trunk girth of the tree; and `stock(t1)` and `stock(t0)` are the initial tree carbon stock and the tree carbon stock after one year, which are computed through the equation above using the initial value and the value after one year of `trunk_girth`. The equation models the annual growth of the diameter of a tree and is derived from [this scientific paper](https://iforest.sisef.org/contents/?id=ifor0635-005).



## Webapp <a name="webapp"></a>



## Conclusions <a name="conclusions"></a>


