const express = require('express');

const router = express.Router();

const auth = require('../../middleware/hostelWardenAuth');




router.post('/login', require('../../controllers/hostelWarden/login'));

router.post('/addVehicle', require('../../controllers/hostelWarden/addVehicle'));

router.post('/removeVehicle', require('../../controllers/hostelWarden/removeVehicle'));

router.get('/getVehicle', require('../../controllers/hostelWarden/getVehicle'));

router.get('/getStudentData', require('../../controllers/hostelWarden/getStudentData'));

router.post('/addParentVisit', require('../../controllers/hostelWarden/addParentVisit'));

router.get('/getStudentLogs', require('../../controllers/dataTables/getStudentLogs'));






module.exports = router;