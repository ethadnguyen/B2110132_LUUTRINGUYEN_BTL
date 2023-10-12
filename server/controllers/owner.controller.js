const Owner = require("../models/owner.model");

const createOwner = async (req, res) => {
    try {
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = req.file.location;
        await owner.save();

        res.json({
            success: true,
            message: "Successfully created a new owner"
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getOwners = async (req, res) => {
    try {
        let owners = await Owner.find();

        res.json({
            owners: owners,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createOwner,
    getOwners
};