// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.

    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
      <h2>Mission Destination</h2>
      <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
      </ol>
      <img src="${imageUrl}">
    `;
  }

function validateInput(input) {
    if (input === "") {
      return "Empty";
    } else if (isNaN(Number(input))) {
      return "Not a Number";
    } else {
      return "Is a Number";
    }
  }
  
function formSubmission(document, pilot, copilot, fuelLevel, cargoMass) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let faultyItems = document.getElementById("faultyItems");
    let launchStatus = document.getElementById("launchStatus");
  
    let pilotValid = validateInput(pilot);
    let copilotValid = validateInput(copilot);
    let fuelLevelValid = validateInput(fuelLevel);
    let cargoMassValid = validateInput(cargoMass);
  
    if (pilotValid === "Empty" || copilotValid === "Empty" || fuelLevelValid === "Empty" || cargoMassValid === "Empty") {
      alert("All fields are required!");
    } else if (pilotValid === "Is a Number" || copilotValid === "Is a Number" || fuelLevelValid === "Not a Number" || cargoMassValid === "Not a Number") {
      alert("Make sure to enter valid information for each field!");
    } else {
      pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
      copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
  
      if (Number(fuelLevel) < 10000) {
        faultyItems.style.visibility = "visible";
        fuelStatus.innerHTML = "There is not enough fuel for the journey.";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
      } else if (Number(cargoMass) > 10000) {
        faultyItems.style.visibility = "visible";
        cargoStatus.innerHTML = "There is too much mass for the shuttle to take off.";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
      } else {
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
      }
    }
  }


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;