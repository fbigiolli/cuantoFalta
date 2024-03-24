export async function fetchFromAPI(CLIENT_ID, CLIENT_SECRET){
  // Define URL and fetch data from API
  // uso corsproxy porque la API es tan pero tan buena que si no no me deja mandar la request jej
  const url =  `https://corsproxy.io/?https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`; 
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

