// Global Variables
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "96ba12c9d38d4c699f11cc2e5f766936&units=imperial";
const click = document.querySelector("#generate");

// get weather data
const getWeather = async (zip) => {
    const res = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
};


click.addEventListener("click", performAction)

function performAction() {
    const zip = document.getElementById("zip").value;
    const userResponse = document.getElementById("feelings").value;
    
    // Create a new date instance dynamically with JS
    const date = new Date().toLocaleDateString('en-US');

    getWeather(zip)
        .then((data) => {
            if (data.main) {
                postData("/add", {
                    temperature: data.main.temp,
                    date: date,
                    userResponse: userResponse,
                });
            }
        })
        .then(() => updateUI());
      
}


const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log("Error posting data:", error);
    }
};

const updateUI = async () => {
    const res = await fetch("/all");
    try {
        const data = await res.json();
        document.getElementById("date").innerHTML = `Date: ${data.date}`;
        document.getElementById("temp").innerHTML = `Temperature: ${Math.round(data.temperature)} °C`;
        document.getElementById("content").innerHTML = `Feeling: ${data.userResponse}`;
    } catch (error) {
        console.log("Error updating UI:", error);
    }
};

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// console.log(newDate)