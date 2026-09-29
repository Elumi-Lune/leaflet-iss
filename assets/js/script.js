// création de la carte
var map = L.map('map').setView([51.505, -0.09], 13);
// variable global icone
var sateliteIcon = L.icon({
    iconUrl: './assets/img/satellite.png',

    iconSize: [38, 95], // size of the icon
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// la fonction va chercher la latitude et la longitude de la station et l'afficher sur la carte
async function getPosition() {
  const url = "http://api.open-notify.org/iss-now.json";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const liste = Object.values(result.iss_position);
    console.log(liste); // liste de la position

    // la variable qui contient le marqueur sa position et l'icone associer
    const marker = L.marker([liste[1], liste[0]], {icon: sateliteIcon}).addTo(map)
        .bindPopup("C'est L'ISS !")
        map.addLayer(marker); // ajoute le marqueur
        map.setView([liste[1], liste[0]], 6)

  } catch (error) {
    console.error(error.message);
  }
}

// application principal plus la boucle de 10 seconde
getPosition();
(function loop() {
  setTimeout(() => {
    getPosition();
    loop();
  }, "10000");
})();