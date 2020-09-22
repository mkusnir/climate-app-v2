import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

var temperatureArray = [];
var humidityArray = [];
var pressureArray = [];
var co2Array = [];

var currentTemperature;
var currentHumidity;
var currentPressure;
var currentCo2;

const backendURL = process.env.REACT_APP_URL;
const backendLatestURL = process.env.REACT_APP_LATEST_URL;
const userName = process.env.REACT_APP_USER_ID;
const userPassword = process.env.REACT_APP_USER_PASSWORD;

export default class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {

            series: [],
            options: {
                chart: {
                    type: 'area',
                    stacked: false,
                    height: 350,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },

                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                    },
                },
                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return (val).toFixed(1);
                        },
                    },
                },
                xaxis: {
                    type: 'datetime',
                    range: 86400000,
                    labels: {
                        formatter: value => {
                            const categoryTime = new Date(value);
                            const hours = categoryTime.getHours();
                            const minutes = categoryTime.getMinutes();
                            const minutesString = minutes === 0
                                ? `${minutes}0`
                                : minutes < 10
                                    ? `0${minutes}`
                                    : minutes;


                            return `${hours}:${minutesString}`;
                        },
                    },
                    tooltip: {

                        shared: false,
                        y: {
                            formatter: function (val) {
                                return (val)
                            }
                        }
                    }
                },

            },
        }
    }
    componentDidMount() {

        axios.get(backendLatestURL, {
            auth: {
                username: userName,
                password: userPassword
            }
        })
            .then(response => {
                currentTemperature = response.data.temperature;
                currentHumidity = response.data.humidity;
                currentPressure = response.data.pressure;
                currentCo2 = response.data.co2;
                this.forceUpdate();
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(backendURL, {
            auth: {
                username: userName,
                password: userPassword
            }
        })
            .then(response => {
                response.data.forEach(element => {

                    var timestampEntry = Date.parse(element.timestamp);
                    temperatureArray.push([timestampEntry, element.temperature])
                    humidityArray.push([timestampEntry, element.humidity])
                    pressureArray.push([timestampEntry, element.pressure])
                    co2Array.push([timestampEntry, element.co2])
                });
                
                this.updateChartType('temperature')
                this.updateChartRange('1d')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    updateChartRange(chartRange) {
        switch (chartRange) {
            case '1h':
                this.setState({ options: { xaxis: { range: 1 * 3600 * 1000 } } })
                break;
            case '2h':
                this.setState({ options: { xaxis: { range: 2 * 3600 * 1000 } } })
                break;
            case '4h':
                this.setState({ options: { xaxis: { range: 4 * 3600 * 1000 } } })
                break;
            case '6h':
                this.setState({ options: { xaxis: { range: 6 * 3600 * 1000 } } })
                break;
            case '12h':
                this.setState({ options: { xaxis: { range: 12 * 3600 * 1000 } } })
                break;
            case '1d':
                this.setState({ options: { xaxis: { range: 1 * 86400 * 1000 } } })
                break;
            case '2d':
                this.setState({ options: { xaxis: { range: 2 * 86400 * 1000 } } })
                break;
            case '3d':
                this.setState({ options: { xaxis: { range: 3 * 86400 * 1000 } } })
                break;
            case '1w':
                this.setState({ options: { xaxis: { range: 7 * 86400 * 1000 } } })
                break;
            case '2w':
                this.setState({ options: { xaxis: { range: 14 * 864000 * 1000 } } })
                break;
            default:
                this.setState({ options: { xaxis: { range: 86400 * 1000 } } })
                break;
        }
    }

    updateChartType(chartType) {
        switch (chartType) {
            case 'temperature':
                this.setState({ series: [{ name: 'Temperature', data: temperatureArray }] })
                break;
            case 'pressure':
                this.setState({ series: [{ name: 'Pressure', data: pressureArray }] })
                break;
            case 'humidity':
                this.setState({ series: [{ name: 'Humidity', data: humidityArray }] })
                break;
            case 'co2':
                this.setState({ series: [{ name: 'CO2', data: co2Array }] })
                break;
            default:
                this.setState({ series: [{ name: 'Temperature', data: temperatureArray }] })
                break;
        };
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md="auto">
                        <Row>
                            <Card border="danger" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>
                                        {currentTemperature} °C
                                    </Card.Title>
                                    <Card.Text>
                                        Current Temperature
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => this.updateChartType('temperature')}>Graph it!</Button>
                                </Card.Body>
                            </Card>
                        </Row>

                        <Row>

                            <Card border="primary" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{currentHumidity} %</Card.Title>
                                    <Card.Text>
                                        Current Humidity
                                     </Card.Text>
                                    <Button variant="primary" onClick={() => this.updateChartType('humidity')}>Graph it!</Button>
                                </Card.Body>
                            </Card>
                        </Row>

                        <Row>
                            <Card border="warning" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{currentPressure} kPa</Card.Title>
                                    <Card.Text>
                                        Current Pressure
                                     </Card.Text>
                                    <Button variant="primary" onClick={() => this.updateChartType('pressure')}>Graph it!</Button>
                                </Card.Body>
                            </Card>
                        </Row>

                        <Row>
                            <Card border="success" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{currentCo2} ppm</Card.Title>
                                    <Card.Text>
                                        Current CO2
                                     </Card.Text>
                                    <Button variant="primary" onClick={() => this.updateChartType('co2')}>Graph it!</Button>
                                </Card.Body>
                            </Card>
                        </Row>

                    </Col>

                    <Col md="auto">
                        <Row>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Chart Type
                            </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.updateChartType('temperature')}>Temperature</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartType('humidity')}>Humidity</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartType('pressure')}>Pressure</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartType('co2')}>CO2</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>

                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Chart Range
                            </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.updateChartRange('1h')}>now-1h</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartRange('2h')}>now-2h</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartRange('4h')}>now-4h</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartRange('6h')}>now-6h</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartRange('12h')}>now-12h</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartRange('1d')}>now-1d</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartRange('2d')}>now-2d</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartRange('3d')}>now-3d</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartRange('1w')}>now-1w</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.updateChartRange('2w')}>now-2w</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>

                        <Row>
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="area"
                                width="820"
                            />
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}