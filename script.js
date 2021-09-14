// Javascript for the Weather App website!

// API Key from OpeanWeather.com!! KEEP IT A SECRET!!
const apiKey = "********************************";

// Use the city name OR city name, country code to search.
const form = document.querySelector(".top-header form");
const input = document.querySelector(".top-header input");
const msg = document.querySelector(".top-header .msg");
const list = document.querySelector(".ajax-section .cities");

// Create event listener.
form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;
    
    // Ensure that only one city at a time can be selected.
    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);
  
    if (listItemsArray.length > 0) {
      const filteredArray = listItemsArray.filter(el => {
        let content = "";
        //athens,gr
        if (inputVal.includes(",")) {

          if (inputVal.split(",")[1].length > 2) {
            inputVal = inputVal.split(",")[0];
            content = el
              .querySelector(".city-name span")
              .textContent.toLowerCase();
          } else {
            content = el.querySelector(".city-name").dataset.name.toLowerCase();
          }
        } else {
 
          content = el.querySelector(".city-name span").textContent.toLowerCase();
        }
        return content == inputVal.toLowerCase();
      });
  
      if (filteredArray.length > 0) {
        msg.textContent = `Already searched for the weather for ${
          filteredArray[0].querySelector(".city-name span").textContent
        }, please be more specific!!`;
        form.reset();
        input.focus();
        return;
      }
    }

    // AJAX code
    // Link to retrieve weather data from OpenWeather.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal},&appid=${apiKey}&units=imperial&lang=en`;

    // Retrieve data from OpenWeather.
    fetch(url)
        .then(response => response.json())
        .then(data => { 
            const { main, name, sunrise, sunset, sys, weather } = data;
            const sunriseTime = new Date(sys.sunrise * 1000);
            const sunsetTime = new Date(sys.sunset * 1000);

            const icon = `https://openweathermap.org/img/wn/${
                weather[0]["icon"]
              }@2x.png`;

            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
              <span>${name}</span>
              <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup>
            </div>
            <figure>
              <img class="city-icon" src="${icon}" alt="${weather[0]["main"]}">
              <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
            <div class="city-sunrise">Sunrise: ${sunriseTime.toLocaleTimeString()}</div>
            <div class="city-sunset">Sunset: ${sunsetTime.toLocaleTimeString()}</div>
          `;

            li.innerHTML = markup;
            list.appendChild(li);
        })
        .catch(() => {
            msg.textContent = `Please try your search again.`;
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});
