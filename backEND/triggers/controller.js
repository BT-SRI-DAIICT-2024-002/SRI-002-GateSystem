const cron = require('node-cron');


// THIS CRON TIME IS IN GMT
cron.schedule('16 10 * * *', require('./attendence/monthlyUpdate'));

cron.schedule('5 0 * * *', require('./lateReport/lateReport'));

cron.schedule('5 0 * * *', require('./parent/deleteParent'));

cron.schedule('5 0 * * *', require('./visitor/visitor'));
