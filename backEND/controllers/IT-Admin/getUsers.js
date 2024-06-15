const registrar = require('../../models/static/registrar/registrar');
const hostelWarden = require('../../models/static/hostelWarden/hostelWarden');
const staff = require('../../models/static/staff/staff');



const getRegistrar = async (req, res) => {
    try {
        const registrarData = await registrar.find();

        if (!registrarData) {         
            return res.status(404).send({ message: "Data not found" });
        }

        res.status(200).send(registrarData);
    } catch (error) {
        console.log("This is is error from ./controllers/IT-Admin/getUsers.js ")
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}


const getHostelWarden = async (req, res) => {
    try {
        const hostelWardenData = await hostelWarden.find();
        res.status(200).send(hostelWardenData);
    } catch (error) {
        console.log("This is is error from ./controllers/IT-Admin/getUsers.js ")
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

const getStaff = async (req, res) => {
    try {
        const staffData = await staff.find();
        res.status(200).send(staffData);
    } catch (error) {
        console.log("This is is error from ./controllers/IT-Admin/getUsers.js ")
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}



module.exports = {getRegistrar, getHostelWarden, getStaff};