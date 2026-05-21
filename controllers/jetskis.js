const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAllJetskis = async (req, res) => {
    try {
        
        const result = await mongodb.getDatabase().db().collection('jetskis').find();
        const jetskis = await result.toArray();

        if(jetskis.length === 0) {
            console.log('Error while fetching jetskis');
            return res.status(404).json({ message: 'An error occured while fetching the jetskis'});
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(jetskis);

    } catch(error) {
        console.log('Error fetching jetskis', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
}

const getOneJetski = async (req, res) => {
    try {

        const jetskiId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('jetskis').find({_id: jetskiId});
        const jetskis = await result.toArray();

        if(jetskis.length === 0) {
            console.log('Error while fetching one jetski');
            return res.status(404).json({ message: 'There was an error while fetching the jetski'});
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(jetskis[0]);

    } catch(error) {
        console.log('Error while fetching one jetski', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
}

const addJetski = async (req, res) => {
    try {

        const jetski = {
        brand: req.body.brand,
        model: req.body.model,
        horsepower: req.body.horsepower,
        weight: req.body.weight,
        storage: req.body.storage,
        persons: req.body.persons,
        fueltank: req.body.fueltank
        }

        const response = await mongodb.getDatabase().db().collection('jetskis').insertOne(jetski);
        if (response.acknowledged) {
            return res.status(201).send();
        }

    } catch(error) {
        console.log('Error while adding jetski', error);
        return res.status(500).json({ message: 'There was an error while adding the jetski'});
    }
}

const updateJetski = async (req, res) => {
    try {

        const jetskiId = new ObjectId(req.params.id);
        const jetski = {
        brand: req.body.brand,
        model: req.body.model,
        horsepower: req.body.horsepower,
        weight: req.body.weight,
        storage: req.body.storage,
        persons: req.body.persons,
        fueltank: req.body.fueltank
        }

        const response = await mongodb.getDatabase().db().collection('jetskis').replaceOne({_id: jetskiId}, jetski);
        if (response.modifiedCount > 0) {
            return res.status(204).send();
        } else {
            console.log('Error while updating jetski');
            return res.status(404).json({ message: 'The jetski could not be updated'});
        }

    } catch(error) {
        console.log('Error while updating jetski', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
}

const deleteJetski = async (req, res) => {
    try {
    
        const jetskiId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('jetskis').deleteOne({_id: jetskiId});

        if (response.deletedCount > 0) {
            return res.status(204).send();
        } else {
            console.log('Error while deleting jetski');
            return res.status(404).json({ message: 'The jetski could not be deleted' });
        }

    } catch(error) {
        console.log('Error while deleting jetski', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
}

module.exports = { getAllJetskis, getOneJetski, addJetski, updateJetski, deleteJetski };