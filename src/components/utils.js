import haversine from 'haversine-distance';

export async function fetchFromAPI(CLIENT_ID, CLIENT_SECRET){
  // Define URL and fetch data from API
  // uso corsproxy porque la API es tan pero tan buena que si no no me deja mandar la request jej
  const url =  `https://corsproxy.io/?https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`; 
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

function dosDecimales(n) {
  let t=n.toString();
  let regex=/(\d*.\d{0,2})/;
  return t.match(regex)[0];
}

export function distanceBetweenTwoPoints(latitude1,longitude1,latitude2,longitude2){
  const p1 = {latitude: latitude1, longitude:longitude1};
  const p2 = {latitude: latitude2, longitude:longitude2};
  // Haversine devuelve en metros, paso a km y trunco decimales
  return dosDecimales(haversine(p1,p2) / 1000);
}
