"use strict";
/**
 * This file contains constants for the environment
 */
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.resolve(__dirname, `${process.env.ENV}.env`),
});
module.exports = {
    ENV: process.env.ENV || 'dev',
    APPLICATION_NAME: process.env.APPLICATION_NAME || 'qp-application',
    APPLICATION_BASE: process.env.APPLICATION_BASE || '/api',
};
