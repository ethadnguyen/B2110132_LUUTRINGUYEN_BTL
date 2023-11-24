const Owner = require("../models/owner.model");

const createOwner = async (req, res) => {
    try {
        console.log(req.body);
        const existingOwner = await Owner.findOne({ name: req.body.name });
        if (existingOwner) {
            return res.status(400).json({
                success: false,
                message: "An owner with the same name already exists"
            });
        }
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = req.file.location;
        await owner.save();

        res.json({
            success: true,
            message: "Successfully created a new owner"
        });
    } catch (err) {
        console.log(err);
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

const deleteOwner = async (req, res) => {
    try {
        let deletedOwner = await Owner.findByIdAndDelete(req.params.id);
        if (deletedOwner) {
            res.json({
                success: true,
                message: "Successfully deleted"
            });
        }
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
    getOwners,
    deleteOwner,
};