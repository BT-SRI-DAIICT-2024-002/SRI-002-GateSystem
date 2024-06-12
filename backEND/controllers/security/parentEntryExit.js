const parent_transactional = require('../../models/transactional/parent');
const parent = require('../../models/static/parent/parent');
const parent_logs = require('../../models/logs/parent');

const uploadFile = require('../../blob/azureBlob');

const parentEntryExit = async (req, res) => {

    try {
        const { uuid } = req.body;

        const photo1 = req.files.photo1;
        const photo2 = req.files.photo2;

        const match = await parent_transactional.findOne({ uuid: uuid });

        if (match) {

            // Already inside campus

            var current_date = new Date();
            current_date = new Date(current_date.getTime() + 5.5 * 3600 * 1000);
                    
            const exit_photo1 = await uploadFile(photo1.tempFilePath, "parent");
            var exit_photo2 = "";
            if(photo2){
                exit_photo2 = await uploadFile(photo2.tempFilePath, "parent");
            }

            const parent_l = new parent_logs({
                uuid: uuid,
                exit_time: current_date,
                exit_photo1: exit_photo1,
                exit_photo2: exit_photo2,
                entry_time: match.entry_time,
                entry_photo1: match.entry_photo1,
                entry_photo2: match.entry_photo2,
                student_id: match.student_id,
                name1: match.name1,
                name2: match.name2,
                mobile: match.mobile,
                arrival_date: match.arrival_date,
                purpose: match.purpose
            });

            const parent_log = await parent_l.save();

            await parent_transactional.deleteOne({ uuid: uuid });

            res.status(200).send({ message: "Parent Exit Successful" });

        }
        else {

            // Not inside campus

            const arrival_photo1 = await uploadFile(photo1.tempFilePath, "parent");
            var arrival_photo2 = "";
            if(photo2){
                arrival_photo2 = await uploadFile(photo2.tempFilePath, "parent");
            }

            const data = await parent.findOne({ uuid: uuid });

            var current_date = new Date();
            current_date = new Date(current_date.getTime() + 5.5 * 3600 * 1000);

            const parent_t = new parent_transactional({
                uuid: uuid,
                student_id: data.student_id,
                name1: data.name1,
                name2: data.name2,
                mobile: data.mobile,
                arrival_date: data.arrival_date,
                purpose: data.purpose,
                entry_time: current_date,
                entry_photo1: arrival_photo1,
                entry_photo2: arrival_photo2,
            });

            const save = await parent_t.save();

            await parent.deleteOne({ uuid: uuid });

            res.status(200).send({ message: "Parent Entry Successful" });

        }

    } catch (error) {
        console.log("This is error from ./controllers/security/parentEntryExit.js");
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = parentEntryExit;