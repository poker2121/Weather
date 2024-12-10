let searchInput = document.getElementById("searchInput");
let rowData = document.getElementById("rowData");

getWeather("Damietta");

searchInput.addEventListener("input", function () {
  getWeather(searchInput.value);
});

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error:", error);
  }
}


function displayWeather(data) {
  let cartoona = "";
  const forecast = data.forecast.forecastday;
  const location = data.location.name;

  
  cartoona += `
    <div class="col-md-4">
      <div class="card h-100 border-0">
        <div class="card-header text-white custom-card-header d-flex justify-content-between">
          <span>${formatDay(forecast[0].date)}</span>
          <span>${forecast[0].date}</span>
        </div>
        <div class="card-body custom-card-body text-white">
          <p class="card-text pt-2">${location}</p>
          <h5 class="card-title bgfont">${forecast[0].day.avgtemp_c}°C</h5>
          <div class="status-icon py-4"><img src="${forecast[0].day.condition.icon}" width="70" height="70" alt=""></div>
          <div class="custom text-info pb-3">${forecast[0].day.condition.text}</div>
          <div class="icons-container gap-4">
            <div class="icon-with-text">
              <i class="fa-solid fa-umbrella"></i>
              <span>12%</span>
            </div>
            <div class="icon-with-text">
              <i class="fa-solid fa-wind"></i>
              <span>${forecast[0].day.maxwind_kph} km/h</span>
            </div>
            <div class="icon-with-text">
              <i class="fa-solid fa-compass"></i>
              <span>north</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;


  for (let i = 1; i < forecast.length; i++) {
    cartoona += `
      <div class="col-md-4">
        <div class="card h-100 border-0">
          <div class="card-header text-white custom-card-header text-center hcard2 rounded-0">${formatDay(forecast[i].date)}</div>
          <div class="card-body custom-card-body text-white text-center card2 align-content-center">
            <div class="status-icon pb-3"><img src="${forecast[i].day.condition.icon}" width="40" height="40" alt=""></div>
            <h5 class="card-title pt-3">${forecast[i].day.avgtemp_c}°C</h5>
            <span class="text-white-50">${forecast[i].day.mintemp_c}°C</span>
            <div class="custom text-info pb-3 py-4">${forecast[i].day.condition.text}</div>
          </div>
        </div>
      </div>
    `;
  }

  rowData.innerHTML = cartoona;
}

function formatDay(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-us", { weekday: "long" });
}
