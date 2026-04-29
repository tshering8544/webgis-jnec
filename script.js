// TASK 1: Paste map creation code here
// 1. Show the Sign In modal automatically when the page loads
document.addEventListener('DOMContentLoaded', function() {
    var myModal = new bootstrap.Modal(document.getElementById('signInModal'));
    myModal.show();
});

// 2. Function to handle the button click
function handleSignIn() {
    const email = document.getElementById('userEmail').value;
    const pass = document.getElementById('userPassword').value;

    // Simple check (You can replace this with actual authentication later)
    if (email !== "" && pass !== "") {
        alert("Sign in successful!");
        
        // Hide the modal
        var modalElement = document.getElementById('signInModal');
        var modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        
        // Initialize your map here if it wasn't already
        // initMap(); 
    } else {
        alert("Please enter both email and password.");
    }
}

const map = L.map("map").setView([27.5, 90.4], 8);

// TASK 2: Paste basemap code here
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// TASK 3: Paste layer group code here
const dzongkhagLayer = L.layerGroup().addTo(map);
const educationLayer = L.layerGroup().addTo(map);
const healthLayer = L.layerGroup().addTo(map);


// TASK 4: Paste zoom function here
function zoomToBhutan() {
  map.setView([27.5, 90.4], 8);
}



// TASK 5: Paste GeoJSON layer loading code here
fetch("./Data/bhutan_dzong_web.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "black",
        weight: 1,
        fillColor: "orange",
        fillOpacity: 0.3
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Dzongkhag Boundary");
      }
    }).addTo(dzongkhagLayer);
  });

fetch("./Data/bhutan_education_center.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 5,
          color: "blue",
          fillColor: "blue",
          fillOpacity: 0.8
        });
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Education Center");
      }
    }).addTo(educationLayer);
  });

fetch("./Data/bhutan_health_center.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 5,
          color: "red",
          fillColor: "red",
          fillOpacity: 0.8
        });
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Health Center");
      }
    }).addTo(healthLayer);
  });


// TASK 6: Paste layer control code here
const overlayMaps = {
  "Dzongkhag Boundary": dzongkhagLayer,
  "Education Centers": educationLayer,
  "Health Centers": healthLayer
};

L.control.layers(null, overlayMaps).addTo(map);

L.control.measure({
  position: "topleft",
  primaryLengthUnit: "meters",
  secondaryLengthUnit: "kilometers",
  primaryAreaUnit: "sqmeters",
  secondaryAreaUnit: "hectares",
  activeColor: "#e41a1c",
  completedColor: "#4daf4a"
}).addTo(map);

function setTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'auto') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.setAttribute('data-bs-theme', systemTheme);
    } else {
        root.setAttribute('data-bs-theme', theme);
    }
    
    // Save preference to local storage so it stays after refresh
    localStorage.setItem('theme', theme);
}

// Check for saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    setTheme(savedTheme);
});