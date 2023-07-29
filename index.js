
let gridData = []; // Array to hold the cryptocurrency market data for grid view
let listData = []; // Array to hold the cryptocurrency market data for list view


  // Function to fetch the data from the JSON file


let isGridView = true; // Flag to keep track of the current view mode

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
          <p>${isGridView?"Total Volume :":""} ${crypto.total_volume}</p>
          <p>${isGridView?"Market Cap :":""} ${crypto.market_cap}</p>
        </div>
      </div>
    </div>`;
}
function updateCryptoCards(data) {
  let output = '';
  if (isGridView) {
    data.forEach((crypto) => {
      output += generateCryptoCard(crypto);
    });
    document.getElementById('crypto').style.display = 'grid';
    document.getElementById('cryptoList').style.display = 'none';
  } else {
    data.forEach((crypto) => {
      output += generateCryptoCard(crypto);
    });
    document.getElementById('crypto').style.display = 'none';
    document.getElementById('cryptoList').style.display = 'block';
  }
  document.getElementById(isGridView ? 'crypto' : 'cryptoList').innerHTML = output;
}

async function fetchDataFromJSONFile() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
    const jsonData = await response.json();
    gridData = jsonData.slice(); // Make a shallow copy of the data for grid view
    listData = jsonData.slice(); // Make a shallow copy of the data for list view
    // Once data is loaded, initially display the cards in grid view
    updateCryptoCards(gridData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function setupEventListeners() {
  // Fetch data from the JSON file first
  await fetchDataFromJSONFile();

  // Then set up the event listeners
  document.getElementById("list1").addEventListener("click", function () {
    isGridView = false; // Switch to List View
    updateCryptoCards(listData);
    document.getElementById("grid").classList.remove("active");
    document.getElementById("list1").classList.add("active");
    document.querySelector(".underline").style.width = "50%";
    document.querySelector(".underline").style.marginLeft = "50%"; 
   
  });

  document.getElementById("grid").addEventListener("click", function () {
    isGridView = true; // Switch to Grid View
    updateCryptoCards(gridData);
    document.getElementById("grid").classList.add("active");
   document.getElementById("list1").classList.remove("active");
   document.querySelector(".underline").style.width = "50%"; 
   document.querySelector(".underline").style.marginLeft = "0%";
    
  });
}

// Call the function to set up the event listeners after the page loads
setupEventListeners();