const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAllBoats = async (req, res) => {
    try {

        const result = await mongodb.getDatabase().db().collection('boats').find();
        const boats = await result.toArray();

        if (boats.length === 0) {
            return res.status(404).json({ message: 'No boats found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(boats);

    } catch(error) {
        console.log('Error fetching boats', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
};

const getOneBoat = async (req, res) => {
    try {

        if (!objectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'You must enter a valid boat id' })
        }

        const boatId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('boats').find({_id: boatId});
        const boats = await result.toArray();

        if (boats.length === 0) {
            return res.status(404).json({ message: 'The boat was not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(boats[0]);

    } catch (error) {
        console.log('Error fetching the specific boat', error);
        return res.status(500).json({ message: 'Internal server error'})
    }
};

const addBoat = async (req, res) => {
    try {

        const boat = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        type: req.body.type,
        class: req.body.class,
        length: req.body.length,
        fuel: req.body.fuel,
        material: req.body.material
        }

        const response = await mongodb.getDatabase().db().collection('boats').insertOne(boat);
        if (response.acknowledged) {
            res.status(201).send();
        }
    
    } catch(error) {
        console.log('There was an error while adding the boat', error);
        return res.status(500).json("Some error occured while adding the boat.");
    }
};

const updateBoat = async (req, res) => {
    try {

        if (!objectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'You must enter a valid boat id' })
        }

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
            return res.status(204).send();
        } else {
            console.log('There was an error while updating the boat');
            return res.status(404).json("The boat could not be updated");
        }

    } catch(error) {
        console.log('There was an error while updating the boat', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
};

const deleteBoat = async (req, res) => {
    try {

        if (!objectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'You must enter a valid boat id' })
        }

        const boatId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('boats').deleteOne({_id: boatId});

        if (response.deletedCount > 0) {
            return res.status(204).send();
        } else {
            return res.status(404).json("Could not find the boat to be deleted.");
        }

    } catch(error) {
        console.log('There was an error while deleting the boat', error);
        return res.status(500).json({ message: 'Internal server error'});
    }
    
};

module.exports = { getAllBoats, getOneBoat, updateBoat, addBoat, deleteBoat }