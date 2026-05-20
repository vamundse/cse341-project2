const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('jetskis').find();
    result.toArray().then((jetskis) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(jetskis);
    });
};

const getOne = async (req, res) => {
    const userId = new ObjectId(req.param.id);
    const result = await mongodb.getDatabase().db().collection('jetskis').find({_id: userId});
    result.toArray().then((jetskis) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(jetskis[0]);
    });
};

module.exports = { getAll, getOne}