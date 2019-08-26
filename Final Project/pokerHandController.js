const pokerHandModel = require('./pokerHandModel');

exports.getCombination = (req, res) => {
    let result = pokerHandModel.getCardCombination(req.body);
    
    return res.status(201).send(result);
};