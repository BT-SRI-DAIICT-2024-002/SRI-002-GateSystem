const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const securityManagerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true,
        unique: true
    },
});

securityManagerSchema.pre("save", (async function (next) {
    
    const password = this.password;

    const hashed_pass = await bcrypt.hash(password, 8);

    this.password = hashed_pass;
    next();
}
))


securityManagerSchema.pre('updateOne', async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        const hashed_pass = await bcrypt.hash(update.password, 8);
        this.setUpdate({ ...update, password: hashed_pass });
    }
    next();
});

module.exports = mongoose.model('SecurityManager', securityManagerSchema);