const path = require("path");
const express = require("express");

function initServer() {
    const publicResourceDir = path.join(__dirname, '../public');
    const viewPath = path.join(__dirname, '../src/templates');

    const app = express();

    app.set('view engine', 'hbs');
    app.set('views', viewPath);
    app.set('x-powered-by', false);
    app.use(express.static(publicResourceDir));

    return app;
}

module.exports = initServer;
