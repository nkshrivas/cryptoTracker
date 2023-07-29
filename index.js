
let data = [];

  // Function to fetch the data from the JSON file


let isGridView = false; // Flag to keep track of the current view mode

function sale(price) {
  if (price > 0) {
    return "green";
  } else {
    return "red";
  }
}

function generateCryptoCard(crypto) {
  return `
    <div class="column">
      <div class="cards">
        <div class="symbol">
          <img src="${crypto.image}" alt="Avatar" >
          <span id="name">
            <h4 style="color:white;"><b>${crypto.symbol.toUpperCase()}</b></h4>
            <p>${crypto.name}</p>
          </span>
        </div>
        <div class="container">
          <p style="color:${sale(crypto.price_change_percentage_24h)}; border:solid 1px; " class="sale rounded-pill">
            ${crypto.price_change_percentage_24h} %
          </p>
          <p class="text-success">$ ${crypto.current_price}</p>
          <p>Total Volume : ${crypto.total_volume}</p>
          <p>Market Cap : ${crypto.market_cap}</p>
        </div>
      </div>
    </div>`;
}

function updateCryptoCards(data) {
  let output = '';
  data.forEach((crypto) => {
    output += generateCryptoCard(crypto);
  });
  document.getElementById(isGridView==true ? 'crypto' : 'cryptoList').innerHTML = output;
}

async function fetchDataFromJSONFile() {
  try {
    const response = await fetch('./markets.json');
    data = await response.json();
    
    // Once data is loaded, initially display the cards in grid view
    updateCryptoCards(data);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
async function setupEventListeners() {
  // Fetch data from the JSON file first
  await fetchDataFromJSONFile();

  // Then set up the event listeners
  document.getElementById("list").addEventListener("click", async function () {
    isGridView = false; // Switch to List View
    await fetchDataFromJSONFile(); // Fetch the latest data
    updateCryptoCards(data);
  });

  document.getElementById("grid").addEventListener("click", async function () {
    isGridView = true; // Switch to Grid View
    await fetchDataFromJSONFile(); // Fetch the latest data
    updateCryptoCards(data);
  });
}

// Call the function to set up the event listeners after the page loads
setupEventListeners();