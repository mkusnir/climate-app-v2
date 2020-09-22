import React, { Component } from 'react';

import axios from 'axios';

const ClimateLog = props => (
  <tr>
    <td>{props.climatelog.temperature}</td>
    <td>{props.climatelog.humidity}</td>
    <td>{props.climatelog.pressure}</td>
    <td>{props.climatelog.co2}</td>
    <td>{props.climatelog.freeMem}</td>
    <td>{props.climatelog.timestamp}</td>
  </tr>
)

const backendURL = process.env.REACT_APP_URL;
const userName = process.env.REACT_APP_USER_ID;
const userPassword = process.env.REACT_APP_USER_PASSWORD;

export default class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      climatelogs: []
    };
  }

  componentDidMount() {
    axios.get(backendURL, {
      auth: {
        username: userName,
        password: userPassword
      }
    })
      .then(response => {
        this.setState({ climatelogs: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  ClimateLogList() {
    return this.state.climatelogs.map(currentclimatelog => {
      return <ClimateLog climatelog={currentclimatelog} />;
    })
  }
  render() {
 
    return (
      <div>
        <h3>Climate Logs</h3>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Pressure</th>
              <th>CO2</th>
              <th>Free Memory</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {this.ClimateLogList()}
          </tbody>
        </table>      
      </div>
    )
  }
}