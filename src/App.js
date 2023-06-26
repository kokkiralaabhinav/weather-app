import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const apiKey = "796be0ce76a7339965b8ea24d3f328f3";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        const filteredData = res.data.list.slice(0, 6);
        setData({ ...res.data, list: filteredData });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  useEffect(() => {
    getWeatherDetails("Jabalpur");
  }, []);

  const formatTime = (time) => {
    const date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="text-light heading">Weather Prediction App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {Object.keys(data).length > 0 && (
        <div className="col-md-12 text-center mt-0">
          <div className="shadow rounded weatherResultBox">
            <h5 className="weatherCity">{data?.city?.name}</h5>
            <h6 className="weatherTemp">
              Current: {(data?.list[0]?.main?.temp - 273.15).toFixed(2)}°C
            </h6>
            <div className="row">
              <div className="col-md-2">
                <div className="weatherCard">
                  <p>{formatTime(data?.list[0]?.dt_txt)}</p>
                  <p>{formatDate(data?.list[0]?.dt_txt)}</p>
                  <img
                    className="weatherIcon"
                    src={`https://openweathermap.org/img/wn/${data?.list[0]?.weather[0]?.icon}.png`}
                    alt={data?.list[0]?.weather[0]?.description}
                  />
                  <p>
                    Min: {(data?.list[0]?.main?.temp_min - 273.15).toFixed(2)}°C
                  </p>
                  <p>
                    Max: {(data?.list[0]?.main?.temp_max - 273.15).toFixed(2)}°C
                  </p>
                  <p>Humidity: {data?.list[0]?.main?.humidity}%</p>
                  <p>Wind Flow: {data?.list[0]?.wind?.speed} m/s</p>
                </div>
              </div>
              {data?.list.slice(1).map((item, index) => (
                <div className="col-md-2" key={index}>
                  <div className="weatherCard">
                    <p>{formatTime(item?.dt_txt)}</p>
                    <p>{formatDate(item?.dt_txt)}</p>
                    <img
                      className="weatherIcon"
                      src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}.png`}
                      alt={item?.weather[0]?.description}
                    />
                    <p>Min: {(item?.main?.temp_min - 273.15).toFixed(2)}°C</p>
                    <p>Max: {(item?.main?.temp_max - 273.15).toFixed(2)}°C</p>
                    <p>Humidity: {item?.main?.humidity}%</p>
                    <p>Wind Flow: {item?.wind?.speed} m/s</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
