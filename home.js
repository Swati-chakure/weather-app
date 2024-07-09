let inp=document.querySelector("#inp");
let btn=document.querySelector("#btn");
let cityName=document.querySelector(".city");
let temparature=document.querySelectorAll(".temp");
let weather=document.querySelectorAll(".weath");
let weather_icon=document.querySelector(".weather-icon");
let backimg=document.querySelector(".main");
let humidity=document.querySelector(".humiduty");
let max_temp=document.querySelector(".max-temp");
let min_temp=document.querySelector(".min-temp");
let pressure=document.querySelector(".pressure");
let mainweath=document.querySelector(".mainweath");
let desc=document.querySelector(".desc");
let speed=document.querySelector(".speed");
let visibilities=document.querySelector(".visi");
let sun_rise=document.querySelector(".sunr");
let sun_set=document.querySelector(".suns");
let daysele=document.querySelector(".days");
let day_name=document.querySelector(".day_name");
let daystemp=document.querySelector(".daystemp");
let below_right=document.querySelector(".below-right");
let hour_date=document.querySelector(".date");
let hour_day=document.querySelector(".day")

window.onload = () => {
    checkweather('Bidar');
};

btn.addEventListener('click',()=>{
    checkweather(inp.value)
})


async function checkweather(city){
    let api_key="fe56b9d26b98fbf744c652ef5ab4c00e";
    let urlforhour=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fe56b9d26b98fbf744c652ef5ab4c00e`;

    let weather_hour=await fetch(`${urlforhour}`).then(response =>response.json());

    if(weather_hour.cod===`404`){
        cityName.innerText="city not found";
        return;
    }
     let hour=getTodayTemps(weather_hour.list);
     console.log(hour)
    console.log(weather_hour);
    
    days=[
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    uniqueforcastdays=[]
    let fivedaysforcast=[]
    weather_hour.list.forEach(forecast => {
        let forecastDate = new Date(forecast.dt_txt).toDateString(); // Get the date string
        if (!uniqueforcastdays.includes(forecastDate)) {
            uniqueforcastdays.push(forecastDate);
            fivedaysforcast.push(forecast); // Add the first forecast of the day
        }
    });

//   console.log(fivedaysforcast)
  daysele.innerHTML="";
    for(i=1;i<fivedaysforcast.length;i++){
        let date=new Date(fivedaysforcast[i].dt_txt);
       let day_name=days[date.getDay()]
       let daytemps=Math.round(fivedaysforcast[i].main.temp-273.15)+" °C";

       let weatherCondition = fivedaysforcast[i].weather[0].main.toLowerCase();
    let weatherIcon = "cloud.png"; // default icon

    switch (weatherCondition) {
        case 'rain':
            weatherIcon = "rain.png";
            break;
        case 'clouds':
            weatherIcon = "cloud.png";
            break;
        case 'clear':
            weatherIcon = "mist.png";
            break;
        case 'snow':
            weatherIcon = "snow.png";
            break;
        case 'sunny':
            weatherIcon = "sunny.png";
            break;
        // Add more cases as needed
        default:
            weatherIcon = "cloud.png"; // default icon
    }

       const row = document.createElement('tr');

       const tempCell = document.createElement('td');
       tempCell.innerHTML = `
           <img src="/icons/${weatherIcon}" alt="">
           <br>
           <span>${daytemps}</span>`;
   
       const dayCell = document.createElement('td');
       dayCell.textContent = day_name;
   
       row.appendChild(tempCell);
       row.appendChild(dayCell);
       daysele.appendChild(row);


       
    }

    function getTodayTemps(dataList) {
        const today = new Date().toISOString().split('T')[0];
        return dataList
          .filter(item => item.dt_txt.startsWith(today))
          .map(item => ({
            date:item.dt_txt.split(" ")[0],
            time: item.dt_txt.split(" ")[1],
            temp: item.main.temp,
            main:item.weather[0].main,
          }));
      }


    below_right.innerHTML = `
  <span style="font-size: 25px;color:skyblue;" class="date">${hour[0].date}</span><br><br>
  <span style="font-size: 25px;" class="day">${days[new Date(hour[0].date).getDay()]}</span>
   <div class="weather-container">
`

        for(i=0;i<hour.length;i++){
            let weatherCondition = hour[i].main.toLowerCase();
            let weatherIconHour = "cloud.png"; // default icon
        
            switch (weatherCondition) {
                case 'rain':
                    weatherIconHour = "rain.png";
                    break;
                case 'clouds':
                    weatherIconHour = "cloud.png";
                    break;
                case 'clear':
                    weatherIconHour = "mist.png";
                    break;
                case 'snow':
                    weatherIconHour = "snow.png";
                    break;
                case 'sunny':
                    weatherIconHour = "sunny.png";
                    break;
                // Add more cases as needed
                default:
                    weatherIconHour = "cloud.png"; // default icon
            }

            const perDayDiv = `
            <div class="per-day">
              <p>${hour[i].time}</p>
              <img src="/icons/${weatherIconHour}" alt="">
              <p>${Math.round(hour[i].temp - 273.15)} °C</p>
            </div>
          `;
      
          below_right.querySelector('.weather-container').innerHTML += perDayDiv;
          }
          below_right.innerHTML += `</div>`;
  

    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    // console.log(url)
    let weather_data=await fetch(`${url}`).then(response =>response.json());
        // console.log(weather_data);
    
    temparature.forEach(temp=>{
        temp.innerHTML=`${Math.round(weather_data.main.temp-273.15)} °C`;
    })
   
    cityName.innerText=weather_data.name;
    weather.forEach(desc=>{
        desc.innerHTML=weather_data.weather[0].description;
    })
    humidity.innerHTML=weather_data.main.humidity;
     max_temp.innerHTML=`${Math.round(weather_data.main.temp_max-273.15)} °C`
     min_temp.innerHTML=`${Math.round(weather_data.main.temp_min-273.15)} °C`;
     pressure.innerHTML=weather_data.main.pressure;
     mainweath.innerHTML=weather_data.weather[0].main;
     speed.innerHTML=weather_data.wind.speed;
     visibilities.innerHTML=`${(weather_data.visibility)/1000}`;

    let indsr=weather_data.sys.sunrise;
    let indss=weather_data.sys.sunset;

    const risedate=new Date(indsr*1000);
    const setdata=new Date(indss*1000);

    const isoofset=5.5 * 60 *60*1000;

    const isdate_sunrise=new Date(risedate.getTime()+isoofset);
    const isdate_sunset=new Date(setdata.getTime()+isoofset)

    const hoursr = isdate_sunrise.getUTCHours().toString().padStart(2, '0');
    const minutesr = isdate_sunrise.getUTCMinutes().toString().padStart(2, '0');
    const secondsr = isdate_sunrise.getUTCSeconds().toString().padStart(2, '0');
    const timerise = `${hoursr}:${minutesr}:${secondsr}`;

    const hourss = isdate_sunset.getUTCHours().toString().padStart(2, '0');
    const minutess = isdate_sunset.getUTCMinutes().toString().padStart(2, '0');
    const secondss = isdate_sunset.getUTCSeconds().toString().padStart(2, '0');
    const timeset = `${hourss}:${minutess}:${secondss}`;

   sun_rise.innerHTML=timerise;
   sun_set.innerHTML=timeset;
    //  sun_rise.innerHTML= datetime.datetime.utcfromtimestamp(indsr);

    switch(weather_data.weather[0].main){
        case "Rain":
            weather_icon.src="/icons/rain.png";
            backimg.style.backgroundImage="url(/images/rain.avif)"
            break;
        case "Clouds":
            weather_icon.src="/icons/cloud.png";
              backimg.style.backgroundImage="url(/images/cloudy.avif)"
                break;
        case "Clear":
            weather_icon.src="/icons/mist.png";
            backimg.style.backgroundImage="url(/images/clear.avif)"
                break;
        case "Snow":
            weather_icon.src="/icons/snow.png";
            backimg.style.backgroundImage="url(/images/cloudy.jpg)"
                break;
        case "Sunny":
            weather_icon.src="/icons/sunny.png";
            backimg.style.backgroundImage="url(/images/sunny.avif)"
            break;
    }
    // console.log(weather_data.name);
}
