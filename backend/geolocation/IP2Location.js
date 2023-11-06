/**
 * IP2Location is a Node.js module that enables developers to easily retrieve geolocation data from IP addresses.
 * This module uses the IP2Location LITE database to provide accurate and up-to-date information.
 * @module IP2Location
 */
const { IP2Location } = require("ip2location-nodejs");

/**
 * IP2Location module for geolocation.
 * @module IP2Location
 * @requires ip2location-nodejs
 * @see {@link https://www.npmjs.com/package/ip2location-nodejs|ip2location-nodejs}
 */

/**
 * Function that returns geolocation information for a given IP address.
 * @function ipLoc
 * @param {string} IP - The IP address to look up.
 * @returns {Object} An object containing the IP address, country, and city of the geolocation.
 */
module.exports.ipLoc = function (IP) {
    // Define function-specific variables
    const _func = "ipLoc";
    const debug = true;
    let result, returnObj;

    // Log debug information
    if (debug) {
        console.log(`${_func}: entry`);
    }

    try {
        //Find the geolocation using the IP input from the local file, and return ip, country and city
        result = ip2location.getAll(IP);
        returnObj = {
            ip: result.ip,
            country: result.country_long,
            city: result.city,
        };
        // Log debug information
        if (debug) {
            console.log(`${_func}: exit`);
        }
        // Return the geolocation object
        return returnObj;

    } catch (err) {
        // Log any errors that occur
        console.log(`${_func}: error -> ${err}`);
    }
};
