import { useState } from 'react'
import './App.css'

const api = {
  key: '33f6199e0628ce95afb57e99b9d93af1',
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState();

  const searchPressed = async () => {
    setWeather(null);
    setError(false);
    setMsg(null);
  
    try {
      const res = await fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`);
      if(res.ok){
        const result = await res.json();
        setWeather(result);
      }else{
        const result = await res.json();
        setError(true);
        setMsg(result);
      }
    } catch (error) {
      setError(true);
      setMsg({ message: 'An unexpected error occurred' });
    }
  };

  return (
    <>
      <h1>CloudCast</h1>

      <div>
        <input id='input' type="text" placeholder='Enter your city' onChange={(e) => setSearch(e.target.value)} />

        <button onClick={searchPressed}>Search</button>
      </div>


       { weather &&
        <div>
          <p>{weather.name}</p>
          <p>{weather.main.temp}°C</p>
          <p>{weather.weather[0].main}</p>
          <p>({weather.weather[0].description})</p>
        </div> }

        { error &&
          <div>
            <p>Error occured: {msg?.message}</p>
          </div>}
    </>
  )
}

export default App