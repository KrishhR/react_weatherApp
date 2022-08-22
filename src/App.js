import "./App.css";
import { Fragment, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Snackbar } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import axios from 'axios';

let theme ="";


function App() {

  const [open, setOpen] = useState(false);
  // let [ theme, setTheme ] = useState("");
  
  let [location, setLocation] = useState({
    location: {
      name: "",
      region: "",
      country: "",
      lat: 26.85,
      lon: 80.92,
      tz_id: "",
      localtime_epoch: 0,
      localtime: "",
    },
    current: {
      last_updated_epoch: 0,
      last_updated: "",
      temp_c: 0,
      temp_f: 0,
      is_day: 0,
      condition: {
        text: "",
        icon: "",
        code: 0,
      },
      wind_mph: 0,
      wind_kph: 0,
      wind_degree: 0,
      wind_dir: "",
      pressure_mb: 0,
      pressure_in: 0,
      precip_mm: 0,
      precip_in: 0,
      humidity: 0,
      cloud: 0,
      feelslike_c: 0,
      feelslike_f: 0,
      vis_km: 0,
      vis_miles: 0,
      uv: 0,
      gust_mph: 0,
      gust_kph: 0,
    },
  });

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=location:lucknow`
    )
      .then((response) => response.json())
      .then((data) => setLocation(data));
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const searchLoc = (event) => {
    if (event.key !== "Enter") {
      return;
    } else {
      document.getElementById("error").innerHTML="";
      let locationName = event.target.value;

      axios(
        `https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=${locationName.toLowerCase()}`
      )
      .then((data) => { setLocation(data.data)})
      .catch(err => {
        document.getElementById('error').innerHTML=err;
        handleClick();
      });

      if (location.current.condition.text.toLowerCase().indexOf("sun")>-1) {
      //  setTheme("https://imengine.public.prod.cmg.infomaker.io/?uuid=c1d3deeb-6e98-5e7e-a0c2-a3d30517b8e7&function=cropresize&type=preview&source=false&q=75&crop_w=0.99999&crop_h=0.99999&width=1200&height=675&x=1.0E-5&y=1.0E-5")
        theme =
          "https://imengine.public.prod.cmg.infomaker.io/?uuid=c1d3deeb-6e98-5e7e-a0c2-a3d30517b8e7&function=cropresize&type=preview&source=false&q=75&crop_w=0.99999&crop_h=0.99999&width=1200&height=675&x=1.0E-5&y=1.0E-5";
          document.body.style.background=`url(${theme})`;
          document.body.style.backgroundRepeat='no-repeat';
          document.body.style.backgroundSize='cover'
          
          
      }
      else if(location.current.condition.text.toLowerCase().indexOf("cloud")>-1){
        theme = 
          "https://t3.ftcdn.net/jpg/03/02/03/70/360_F_302037028_WgdzBqp7MCTF0iITajUUVryCKJsyjOE6.jpg";
          document.body.style.background=`url(${theme})`;
          document.body.style.backgroundRepeat='no-repeat';
          document.body.style.backgroundSize='cover'
          
      }
     
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Online Weather App</h1>

        <input
          type="text"
          id="user_loc"
          placeholder="Search your location..."
          autoFocus
          onKeyPress={searchLoc}
        />
        <p id="error"></p>

        <div id="weather">
          <div className="first">
            <div className="currentTemp">
              <h1>{location.location.name}</h1>&emsp;
              <span className="temp">
                {location.current.temp_c}
                <sup>&#8451;</sup>
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "40%",
                }}
              >
                <img
                  id="img"
                  src={location.current.condition.icon}
                  alt=""
                  width="90vw"
                />
                <p>{location.current.condition.text}</p>
              </span>
            </div>
            <h1>
              {" "}
              {location.location.region + ", " + location.location.country}
            </h1>

            <em>Feels Like: {location.current.feelslike_c}&#8451;</em>
            <br />
            <em>{location.location.localtime}</em>
          </div>

          <div className="second">
            <p style={{ display: "flex", alignItems: "center" }}>
              <AirIcon sx={{ fontSize: "3vw" }} />Wind: 
              &nbsp;{location.current.wind_kph} kph {location.current.wind_dir}
            </p>
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/481/481430.png"
                alt=""
                width="30vw"
              />Pressure: 
              &nbsp;{location.current.pressure_in} inch
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1582/1582886.png"
                alt=""
                width="30vw"
              />humidity: 
              &nbsp;{location.current.humidity}%
            </span>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/116/116251.png"
                alt=""
                width="30vw"
              />Precipitation: 
              &nbsp; {location.current.precip_in} inch
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4264/4264841.png"
                alt=""
                width="30vw"
              />Visibility: 
              &nbsp; {location.current.vis_km} km or{" "}
              {location.current.vis_miles} miles
            </span>
          </div>
        </div>
      </div>

      <Snackbar
      id="snack"
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message= "Enter valid input"
        action={action}
      />
    </div>
  );
}

export default App;
