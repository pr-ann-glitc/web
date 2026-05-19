const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let circle = null;

const fallbackCoordinates = {
    'Europe': { lat: 50.110924, lon: 8.682127 },
    'Asia': { lat: 34.047863, lon: 100.619655 },
    'America': { lat: 39.828175, lon: -98.579500 },
    'Africa': { lat: 8.783195, lon: 34.508523 }
};

function fetchToNominatim(countryName) {
    const url = `https://nominatim.openstreetmap.org/search?q=${countryName}&format=json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            if (circle) map.removeLayer(circle);
            circle = L.circle([lat, lon],  {radius: 1500000, color: 'red', fillColor: 'darkRed'}).addTo(map);
        })
        .catch(error => {
            console.log('API недоступно, использую запасные координаты');
            const lat = fallbackCoordinates[countryName].lat;
            const lon = fallbackCoordinates[countryName].lon;
            if (circle) map.removeLayer(circle);
            circle = L.circle([lat, lon],  {radius: 1500000, color: 'red', fillColor: 'darkRed'}).addTo(map);
        });
}

document.getElementById('button-europe').addEventListener('click', function() {
    fetchToNominatim('Europe');
})

document.getElementById('button-asia').addEventListener('click', function() {
    fetchToNominatim('Asia');
})

document.getElementById('button-america').addEventListener('click', function() {
    fetchToNominatim('America');
})

document.getElementById('button-africa').addEventListener('click', function() {
    fetchToNominatim('Africa');
})
