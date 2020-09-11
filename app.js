// window.onload = navigator.serviceWorker.register('/firstWorker.js');

const api = {
    key: "a201f3a8cee095ab189e8f5ed26a5cd2",
    base: "https://api.openweathermap.org/data/2.5/"
}

document.getElementById('search').addEventListener('click', function() {
    let result = document.getElementById('search-box').result;
    if (result)        
        document.getElementById('search-box').result = "";
        getResults(search.value);
});

let search = document.querySelector('#search-box');
search.addEventListener('keypress', get);

function get(searched) {
    if (searched.keyCode == 13) {
        getResults(search.value);
    }   
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPId=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let currentDate = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateTime(currentDate);    

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_type = document.querySelector('.current .weather');
    weather_type.innerText = weather.weather[0].main;

    let now = function displayDay() {
        let day = new Date();

        let months = ['01', '02', '03', '04', '05', '06',
                     '07', '08', '09', '10', '11', '12'];

        let WeekDays = ["Sun", "Mon", "Tue", "Wed",
                        "Thur", "Fri", "Sat"];
        let date = day.getDate();

        return `${WeekDays} ${date} ${months}`
    }

    let hilow = document.querySelector('.hi-low');
    hilow.innerText =  `${now} ${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;

    function dateTime(Day) {
        let months = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
        let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                        'Friday', 'Saturday'];

        let day = weekDays[Day.getDay()];
        let date = Day.getDate();
        let month = months[Day.getMonth()];
        let year = Day.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }
}

document.getElementById('close').addEventListener('click', function() {
    this.parentNode.style.display = 'none';
}, false);

document.getElementById('close1').addEventListener('click', function() {
    this.parentNode.style.display = 'none';
}, false);

document.getElementById('close2').addEventListener('click', function() {
    this.parentNode.style.display = 'none';
}, false);



localStorage.setItem('city', ('#city')) ;
document.getElementsByClassName('recent-details').innerHTML = localStorage.city;
