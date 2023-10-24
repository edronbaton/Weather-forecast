window.addEventListener("DOMContentLoaded", function () {
    // API-config

    let apiKey = '';

    // Get Elements

    let inputForm = this.document.querySelector(".enter-city-input"),
        searchBtn = this.document.querySelector(".image-search"),
        titleItem = this.document.querySelector("#title-item"),
        imageItem = this.document.querySelector(".image-item"),
        degreesItem = this.document.querySelector(".degrees-item"),
        otherResults = this.document.querySelectorAll(".result");

        
    searchBtn.addEventListener("click", async function () {
        let data = await getData(inputForm.value);
        setValues(inputForm.value, data.weather[0].main, Math.round(data.main.temp-273), data.main.humidity, data.wind.speed)          
    })

    function setValues(city, description, degrees, wind, humidity ) {

        titleItem.textContent = city;
        degreesItem.textContent = `${degrees}°`;
        otherResults[1].textContent = `${wind} %`;
        otherResults[0].textContent = `${humidity} km/h`;

        if (description == 'Clouds') {
            imageItem.src = '/src/imgs/clouds.png'
        } else if (description == 'Clear') {
            imageItem.src = '/src/imgs/clear.png'
        } else if (description == 'Rain') {
            imageItem.src = '/src/imgs/rain.png'
        } else if (description == 'Drizzle') {
            imageItem.src = '/src/imgs/drizzle.png'
        } else if (description == 'Mist') {
            imageItem.src ='/src/imgs/mist.png'
        }
        
    }


    async function getData(city) {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        return response.json();
    }



})