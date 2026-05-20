const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAllJetskis = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('jetskis').find();
    result.toArray().then((jetskis) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(jetskis);
    });
};

const getOneJetski = async (req, res) => {
    const jetskiId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('jetskis').find({_id: jetskiId});
    result.toArray().then((jetskis) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(jetskis[0]);
    });
};

const addJetski = async (req, res) => {
    const jetski = {
        brand: req.body.brand,
        model: req.body.model,
        horsepower: req.body.horespower,
        weight: req.body.weight,
        storage: req.body.storage,
        persons: req.body.persons,
        fueltank: req.body.fueltank
    };
    const response = await mongodb.getDatabase().db().collection('boats').insertOne(jetski);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured while updating the boat.")
    }
};

const updateJetski = async (req, res) => {
    const jetskiId = new ObjectId(req.params.id);
    const jetski = {
        brand: req.body.brand,
        model: req.body.model,
        horsepower: req.body.horespower,
        weight: req.body.weight,
        storage: req.body.storage,
        persons: req.body.persons,
        fueltank: req.body.fueltank
    };
    const response = await mongodb.getDatabase().db().collection('boats').replaceOne({_id: jetskiId}, jetski);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured while updating the boat.")
    }
};

const deleteJetski = async (req, res) => {
    const jetskiId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('boats').deleteOne({_id: jetskiId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured while updating the boat.")
    }
};

module.exports = { getAllJetskis, getOneJetski, addJetski, updateJetski, deleteJetski };