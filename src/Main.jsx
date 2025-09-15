import cloud from "./assets/cloud.png"
import clear from "./assets/clear.png"
import drizzle from "./assets/drizzle.png"
import snow from "./assets/snow.png"
import rain from "./assets/rain.png"
import humidity from "./assets/humidity.png"
import search from "./assets/search.png"
import wind from "./assets/wind.png"
import { useEffect, useRef, useState } from "react"



export default function Main() {
    const inputRef = useRef(null)
    const [weather, setWeather] = useState(false)

    const allIcons = {
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
    }

            

    const search1 = async (city)=>{
        if(city===""){
            alert('Enter city name')
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3847e825ea068d6f2fb877cffd80729a`;        
            const res = await fetch(url);
            const data = await res.json();  
            console.log(data);  
            const index = data.weather[0].icon;      
            const icon = allIcons[index];
            
            setWeather({
                humidity:data.main.humidity,
                windspeed: data.wind.speed,
                temperature:Math.floor( data.main.temp-273),
                location: data.name,
                icon: icon,
            })
        }catch(err){
            console.log("Something went wrong")
        }
    }

    useEffect(()=>{
        search1("");
    },[])

  return (
    <main className="border-4 p-4  shadow-2xl shadow-black rounded-2xl flex flex-col items-center mt-10 bg-cyan-400">
      <div className=" rounded flex ease-in duration-300  flex-row gap-2 p-3">
        <input
          ref={inputRef}  
          type="text"
          placeholder="Enter Place name"
          className="border-2 shadow-2xl shadow-cyan-500 p-4 rounded-3xl outline-none w-60 h-10 bg-white"
        />
        <button 
        className="bg-white border-2 text-black font-bold px-3 cursor-pointer py-1 rounded-3xl hover:bg-white 
        hover:scale-95 transition-all"
        onClick={()=>search1(inputRef.current.value)}>
          <img 
          src={search} 
          alt="search"
          className=""
          ></img>
        </button>
      </div>
      <div className="flex flex-col ease-in duration-300 justify-center items-center">
       {weather && weather.icon && (
        <img 
            src={weather.icon} 
            alt="weather_icon"
            className="w-30"
        />
        )}

        <div>
            <p className="font-extrabold text-5xl mt-5 ml-2">{weather.temperature}<sup>o</sup>C</p>
            <p className="font-bold text-3xl mt-1 ml-2">{weather.location}</p>
        </div>
      </div>

       <div className="flex flex-row  ease-in duration-300 gap-12 ">
        <div className="flex flex-row ease-in duration-300  justify-start mt-2 py-5 ">
                <img src={humidity} alt="humidity"></img>
                <div className="ml-2 text-[15px]">
                    <p className="font-extrabold">{weather.humidity}%</p>
                    <p className="font-extrabold">Humidity</p>
                </div>
            </div>
            <div className="flex flex-row  ease-in duration-300 justify-start mt-2 py-5 ">
                <img src={wind} alt="wind"></img>
                <div className="ml-2 text-[15px]">
                    <p className="font-extrabold">{weather.windspeed} Km/hr</p>
                    <p className="font-extrabold">Wind Speed</p>
                </div>
            </div>
        </div>
    </main>
  );
}
