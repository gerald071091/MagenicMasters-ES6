const pokerController = require('./pokerHandController');

exports.routesConfig = function (app) {
    app.get('/poker', [
        pokerController.getCombination
    ]);
};