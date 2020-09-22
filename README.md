# Weather Tracker

Weather Tracker is an application developed using the MERN stack to process, store and visualize data from several sensors. Currently, esp32-weather-station supplies it with sensor data, however Weather Tracker can receive data from any device capable of making HTTP requests.

## Info

### Frontend

The frontend consists of a dashboard where the user can see the latest sensor data and visualize past trends on an interactive graph. Any of the provided data (temperature, humidity, pressure and CO2 concentration) can be graphed, and the range shown on the graph can be selected from a variety of presets.

### Back end

The backend consists of a MongoDB database hosted through Atlas, and an Express.js server hosted on Heroku. The server authenticates the client using HTTP Basic Auth, and can return the complete set of data or the latest entry. It also handles POST requests, so any client that can POST a JSON containing sensor data can publish data to MongoDB.

Older data is discarded automatically through MongoDB TTL indexes.