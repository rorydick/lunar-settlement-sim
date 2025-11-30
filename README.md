# Lunar Settlement Operational Framework (PDHII)

A top-down parametric simulation tool designed to model the resource and infrastructure requirements of a lunar settlement over time. This tool allows mission planners to input variable growth models and site characteristics to forecast energy, oxygen, and volume budgets.

![Status](https://img.shields.io/badge/Status-Prototype-orange) ![Stack](https://img.shields.io/badge/Tech-JS%20%7C%20Chart.js-blue)

## 🔗 [Live Simulation Demo](https://rorydick.github.io/lunar-settlement-sim)

## 🧮 Capabilities

This framework integrates multiple physics and operational models to provide a first-order estimation of settlement sustainability.

### 1. Population Dynamics
The tool supports three distinct growth models to simulate different phases of settlement expansion:
*   **Linear:** Standard crew rotation (fixed arrival/departure rates).
*   **Exponential:** Unconstrained early-stage growth.
*   **Logistic (S-Curve):** Growth constrained by carrying capacity (e.g., life support limits).

### 2. Resource Coupling
Calculates metabolic and operational overhead based on NASA survival data:
*   **Oxygen:** Baseline requirement of 0.84kg per person/day.
*   **Habitation Volume:** User-defined m³ per capita requirements.
*   **Infrastructure:** Dynamic tracking of mass, volume, and energy needs for added facilities.

### 3. Environmental Constraints
Inputs for specific settlement sites (e.g., Shackleton Crater) including:
*   Water ice availability (kg)
*   Thermal extremes (Max/Min K)
*   Solar power availability (% of Mean TSI 1363.03W/m²)

## 🛠️ Modeling Assumptions

*   **Regolith:** Assumed infinite availability for shielding/construction.
*   **Nuclear Fuel:** Models assume fuel is transported from Earth due to current technological uncertainties regarding Lunar He3 extraction.
*   **Time Step:** Simulation runs on a 1-week integer step.

## 💻 Tech Stack

*   **Frontend:** HTML5, CSS3
*   **Logic:** Vanilla JavaScript
*   **Visualization:** Chart.js for real-time plotting of resource deltas.

## 🚀 Usage

1. Clone the repository.
2. Open `index.html` in any modern browser.
3. Select a growth model and input initial parameters.
4. Click "Submit" to generate resource projection graphs.

## License

MIT License
