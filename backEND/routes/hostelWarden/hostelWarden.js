const express = require('express');

const router = express.Router();






router.post('/login', require('../../controllers/hostelWarden/login'));

router.post('/addVehicle', require('../../controllers/hostelWarden/addVehicle'));

router.post('/removeVehicle', require('../../controllers/hostelWarden/removeVehicle'));

router.get('/getStudentData', require('../../controllers/hostelWarden/getStudentData'));




module.exports = router;