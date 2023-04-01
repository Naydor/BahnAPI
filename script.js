const suchen = () => {
    const bahnhof = document.getElementById("bahnhof").value;
    const datum = document.getElementById("datum").value;
    const typ = document.querySelector('input[name="typ"]:checked').value;
  
    const url = `https://api.deutschebahn.com/fahrplan-plus/v1/${typ}/${bahnhof}?date=${datum}&duration=24:00&lang=de`;
    fetch(url, { headers: { Authorization: "Bearer <Dein DB-API-Token>" } })
      .then((response) => response.json())
      .then((data) => {
        let html = "";
        data.forEach((zug) => {
          html += `<p>${zug.trainType} ${zug.trainNumber} - ${zug.stops[0].name} ${zug.stops[0].departure}</p>`;
        });
        document.getElementById("ergebnisse").innerHTML = html;
      });
  };
  
  const fahrstuhl = () => {
    const bahnhof = document.getElementById("bahnhof").value;
  
    const url = `https://api.deutschebahn.com/fahrplan-plus/v1/stations/${bahnhof}`;
    fetch(url, { headers: { Authorization: "Bearer <Dein DB-API-Token>" } })
      .then((response) => response.json())
      .then((data) => {
        let fahrstuhl = "Nein";
        data.facilities.forEach((facility) => {
          if (facility.name === "Fahrstuhl") {
            fahrstuhl = "Ja";
          }
        });
        document.getElementById("fahrstuhl").innerHTML = fahrstuhl;
      });
  };