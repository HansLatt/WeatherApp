import React, {useState} from 'react'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')


  //const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7b0918dfec73bbf7b236c27c53b175b1`
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=7b0918dfec73bbf7b236c27c53b175b1`
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='Enter city'
        type='text'/>
      </div>
      <div className='container'>
      <div className='datenow'>
          {data.list ? <p>{data.list[0].dt_txt}</p> : null}
      </div>
        <div className='top'>
          <div className='location'>
            {data.list ? <p>{data.city.name}</p> : null}
          </div>
          <div className='temp'>
            {data.list ? <h1>{data.list[0].main.temp.toFixed()} C</h1> : null}
          </div>
          <div className='description'>
            {data.list ? <p>{data.list[0].weather[0].main}</p> : null}
          </div>
        </div>

        {data.list!= undefined &&
          <div className='bottom'>
            <div className='feels'>
              <p>Feels like</p>
              {data.list ? <p className='bold'>{data.list[0].main.feels_like.toFixed()} C</p> : null}
            </div>
            <div className='humidity'>
              <p>Humidity</p>
              {data.list ? <p className='bold'>{data.list[0].main.humidity} %</p> : null}
            </div>
            <div className='wind'>
              <p>Wind Speed</p>
              {data.list ? <p className='bold'>{data.list[0].wind.speed.toFixed()} M/S</p> : null}
            </div>
          </div>
        }
        {data.list!= undefined &&
        <div>
          <p>Expected temperature the next hours</p>
          <div className='nextdays'>
            <div className='feels'>
              {data.list ? <p>{data.list[1].dt_txt}</p> : null}
              {data.list ? <p className='bold'>{data.list[1].main.temp.toFixed()} C</p> : null}
            </div>
            <div className='humidity'>
              {data.list ? <p>{data.list[2].dt_txt}</p> : null}
              {data.list ? <p className='bold'>{data.list[2].main.temp.toFixed()} C</p> : null}
            </div>
            <div className='wind'>
              {data.list ? <p>{data.list[3].dt_txt}</p> : null}
              {data.list ? <p className='bold'>{data.list[3].main.temp.toFixed()} C</p> : null}
            </div>
          </div>
        </div>
          
          
        }
        </div>
    </div>
  );
}

export default App;
