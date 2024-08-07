// Libraries
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();


const app = express();


// View Engine Setup 
app.set('views', './hbsTemplates')
app.set('view engine', 'hbs')


// Middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const corsOptions = {
    origin: '*', // Allow all origins
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connection
require('./connection/connect');
require('./connection/azureBlob');

// mailer
require('./SMTP/utils/setup');


// Triggers
require('./triggers/controller');


// ENV Variables
const port = process.env.PORT || 7777;



// Routes
app.use('/student', require('./routes/student/student'));
app.use('/security', require('./routes/security/security'));
app.use('/hostelWarden', require('./routes/hostelWarden/hostelWarden'));
app.use('/staff', require('./routes/staff/staff'));
app.use('/reset', require('./routes/resetPassword/resetPassword'));
app.use('/itAdmin', require('./routes/IT-Admin/itAdmin'));
app.use('/registrar', require('./routes/registrar/registrar'));
app.use('/faculty_adminBlock', require('./routes/faculty_adminBlock/faculty_adminBlock'));
app.use('/securityManager', require('./routes/securityManager/securityManager'));






app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
}
);