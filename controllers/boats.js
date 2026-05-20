const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('boats').find();
    result.toArray().then((boats) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(boats);
    });
};

const getOne = async (req, res) => {
    const userId = new ObjectId(req.param.id);
    const result = await mongodb.getDatabase().db().collection('boats').find({_id: userId});
    result.toArray().then((boats) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(boats[0]);
    });
};

module.exports = { getAll, getOne}