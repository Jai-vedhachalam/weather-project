
        const apiKey = "1e2096094ec3192af04a5b2e3c168099"
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&"

        const searchBox = document.querySelector(".search input")
        const searchBtn = document.querySelector(".search button")
        const weatherIcon = document.querySelector(".weather-icon")

        async function checkWeather(city) {

            try {
                const response = await fetch(apiUrl + `appid=${apiKey}` + `&q=${city}`);

                if (!response.ok) {
                    throw new Error("City Not Found")
                }
                const data = await response.json();




                document.querySelector(".city").innerHTML = data?.name ?? "N/A"
                document.querySelector(".temp").innerHTML = Math.round(data?.main?.temp) + "°c"
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"

                const main = data.weather?.[0]?.main;


                if (data.weather[0].main == "Clouds") {
                    weatherIcon.src = "images/clouds.png";
                }
                else if (data.weather[0].main == "Clear") {
                    weatherIcon.src = "images/clear.png";
                }
                else if (data.weather[0].main == "Rain") {
                    weatherIcon.src = "images/rain.png";
                }
                else if (data.weather[0].main == "Drizzle") {
                    weatherIcon.src = "images/drizzle.png";
                }
                else if (data.weather[0].main == "Mist") {
                    weatherIcon.src = "images/mist.png";
                }
                 else if (data.weather[0].main == "Snow") {
                    weatherIcon.src = "images/snow.png";
                }


            } catch (error) {
                console.error(error);



                document.querySelector(".city").innerHTML = "Error";
                document.querySelector(".temp").innerHTML = "--";
                document.querySelector(".humidity").innerHTML = "--";
                document.querySelector(".wind").innerHTML = "--";




                showToast(error.message);

            }
        }
        function showToast(message) {
            const toast = document.getElementById("toast");

            toast.innerHTML = message;
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        }

        window.onload = () => {
            checkWeather("Chennai");
        }


        searchBtn.addEventListener("click", () => {
            checkWeather(searchBox.value)
        })
        searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
