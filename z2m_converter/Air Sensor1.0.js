const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const ota = require('zigbee-herdsman-converters/lib/ota');
const e = exposes.presets;

const definition = {
    zigbeeModel: ['Air Sensor 1.0'],
    model: 'Air Sensor 1.0',
    vendor: 'Lmahmutov',
    description: 'Room CO2, humidity & temperature & pressure sensor',
    fromZigbee: [fz.humidity, fz.temperature, fz.pressure, fz.co2],
    toZigbee: [],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        const bindClusters = ['msTemperatureMeasurement', 'msRelativeHumidity', 'msPressureMeasurement', 'msCO2'];
        await reporting.bind(endpoint, coordinatorEndpoint, bindClusters);
        await reporting.temperature(endpoint);
        await reporting.humidity(endpoint);
	await reporting.pressure(endpoint);
	await reporting.co2(endpoint);
    },
    exposes: [e.temperature(), e.humidity(), e.pressure(), e.co2()],
    ota: ota.zigbeeOTA,
};

module.exports = definition;
