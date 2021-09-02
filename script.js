// Javascript for the Web App website!

// API Key from OpeanWeather.com!! KEEP IT A SECRET!!
const apiKey = "5a310689a2614242b9ca6646e22ea2b2";

// Use the city name OR city name, country code to search.
const form = document.querySelector(".top-header form");
const input = document.querySelector(".top-header input");
const msg = document.querySelector(".top-header .msg");
const list = document.querySelector(".ajax-section .cities");

// Create event listener.
form.addEventListener("submit", e => {
    e.preventDefault();
    const listItems = list.querySelectorAll(".ajax-section .city");
    const inputVal = input.value;

    // AJAX code
    // Link to retrieve local weather data from OpenWeather.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial`;

    // Retrieve data from OpenWeather.
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
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
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
            </div>
            <figure>
              <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
              <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
          `;

            li.innerHTML = markup;
            list.appendChild(li);
        })
        .catch(() => {
            msg.textContent = "Please search for a major city only.";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});
