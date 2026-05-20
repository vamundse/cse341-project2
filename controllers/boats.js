const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAllBoats = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('boats').find();
    result.toArray().then((boats) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(boats);
    });
};

const getOneBoat = async (req, res) => {
    const boatId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('boats').find({_id: boatId});
    result.toArray().then((boats) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(boats[0]);
    });
};

const addBoat = async (req, res) => {
    const boat = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        type: req.body.type,
        class: req.body.class,
        length: req.body.length,
        fuel: req.body.fuel,
        material: req.body.material
    };
    const response = await mongodb.getDatabase().db().collection('boats').insertOne(boat);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured while updating the boat.")
    }
};

const updateBoat = async (req, res) => {
    const boatId = new ObjectId(req.params.id);
    const boat = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        type: req.body.type,
        class: req.body.class,
        length: req.body.length,
        fuel: req.body.fuel,
        material: req.body.material
    };
    const response = await mongodb.getDatabase().db().collection('boats').replaceOne({_id: boatId}, boat);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured while updating the boat.")
    }
};

const deleteBoat = async (req, res) => {
    const boatId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('boats').deleteOne({_id: boatId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured while updating the boat.")
    }
};

module.exports = { getAllBoats, getOneBoat, updateBoat, addBoat, deleteBoat }