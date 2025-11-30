
const oxygenRequirementPerPersonPerDay = 0.84;

const ctxPopulation = document.getElementById('population').getContext('2d');
const populationChart = createChart(ctxPopulation, 'Total Population');

const ctxOxygen = document.getElementById('oxygenRequirement').getContext('2d');
const oxygenRequirement = createChart(ctxOxygen, 'Total Oxygen Requirement (kg)');

const ctxVolume = document.getElementById('volumeRequirement').getContext('2d');
const volumeRequirement = createChart(ctxVolume, 'Total Habitation Volume Requirement (m³)');

function createChart(ctx, label) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, (_, i) => i + 1),
            datasets: [{
                label: label,
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

let infrastructures = [];

document.getElementById('submitInfraBtn').addEventListener('click', function() {
    // Get input values
    const infraName = document.getElementById('infraName').value;
    const embodiedMaterials = document.getElementById('embodiedMaterials').value;
    const mass = parseFloat(document.getElementById('mass').value);
    const volume = parseFloat(document.getElementById('volume').value);
    const maintenanceNeeds = parseFloat(document.getElementById('maintenanceNeeds').value);

    // Create a new infrastructure object
    const infrastructure = {
        name: infraName,
        embodiedMaterials: embodiedMaterials,
        mass: mass,
        volume: volume,
        maintenanceNeeds: maintenanceNeeds
    };

    // Add the new infra to the array
    infrastructures.push(infrastructure);

    // Update the display
    updateInfraList();
});

function updateInfraList() {
    // Get the technology list element
    const infraList = document.getElementById('infraList');

    // Clear the current list
    infraList.innerHTML = '';

    // Add each technology to the list
    infrastructures.forEach((infrastructure, index) => {
        const infraItem = document.createElement('li');
        infraItem.textContent = `Name: ${infrastructure.name},
        Embodied Materials: ${infrastructure.embodiedMaterials},
        Mass: ${infrastructure.mass} kg,
        Volume: ${infrastructure.volume} m³,
        Maintenance Needs: ${infrastructure.maintenanceNeeds} hrs/week`;

        // Add a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Infrastructure';
        deleteButton.addEventListener('click', function() {
            // Remove the technology from the array
            infrastructures.splice(index, 1);

            // Update the display
            updateInfraList();
        });
        infraItem.appendChild(deleteButton);

        infraList.appendChild(infraItem);
    });
}

function updateInputFields() {
    const growthModel = document.getElementById('growthModel').value;
    if (growthModel === 'linear') {
        document.getElementById('linearInputs').style.display = 'block';
        document.getElementById('exponentialInputs').style.display = 'none';
        document.getElementById('logisticInputs').style.display = 'none';
    } else if (growthModel === 'exponential') {
        document.getElementById('linearInputs').style.display = 'none';
        document.getElementById('exponentialInputs').style.display = 'block';
        document.getElementById('logisticInputs').style.display = 'none';
    } else {
        document.getElementById('linearInputs').style.display = 'none';
        document.getElementById('exponentialInputs').style.display = 'none';
        document.getElementById('logisticInputs').style.display = 'block';
}
}

window.onload = updateInputFields;
document.getElementById('growthModel').addEventListener('change', updateInputFields);

document.getElementById('submitBtn').addEventListener('click', function() {
    const initialPopulation = parseFloat(document.getElementById('initialPopulation').value);
    const volumePerPerson = parseFloat(document.getElementById('volumePerPerson').value);
    const endTime = parseInt(document.getElementById('endTime').value);
    const growthModel = document.getElementById('growthModel').value;

    let volumeData = [];
    let oxygenData = [];
    let populationData = [];
    for (let i = 0; i < endTime; i++) {
        let totalPopulation;
        if (growthModel === 'linear') {
            const arrivalRate = parseFloat(document.getElementById('arrivalRate').value);
            const departureRate = parseFloat(document.getElementById('departureRate').value);
            totalPopulation = initialPopulation + (arrivalRate - departureRate) * i;
        } else if (growthModel ==='exponential') {
            const exponentialGrowthRate = parseFloat(document.getElementById('exponentialGrowthRate').value);
            totalPopulation = initialPopulation * Math.exp(exponentialGrowthRate * i);
        } else {
            const logisticGrowthRate = parseFloat(document.getElementById('logisticGrowthRate').value)
            const carryingCapacity = parseFloat(document.getElementById('carryingCapacity').value);
            totalPopulation = carryingCapacity / (1 + (carryingCapacity - initialPopulation) / initialPopulation * 
            Math.exp(-logisticGrowthRate * i));
        }
        populationData.push(totalPopulation);

        const totalVolumeRequirement = totalPopulation * volumePerPerson;
        volumeData.push(totalVolumeRequirement);

        const totalOxygenRequirement = totalPopulation * oxygenRequirementPerPersonPerDay;
        oxygenData.push(totalOxygenRequirement);
    }

    populationChart.data.labels = Array.from({length: endTime}, (_, i) => i + 1);
    populationChart.data.datasets[0].data = populationData;
    populationChart.update();

    oxygenRequirement.data.labels = Array.from({length: endTime}, (_, i) => i + 1);
    oxygenRequirement.data.datasets[0].data = oxygenData;
    oxygenRequirement.update();

    volumeRequirement.data.labels = Array.from({length: endTime}, (_, i) => i + 1);
    volumeRequirement.data.datasets[0].data = volumeData;
    volumeRequirement.update();
});
