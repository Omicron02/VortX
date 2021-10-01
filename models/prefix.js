const mongoose = require('mongoose');

module.exports = mongoose.model("prefix", prefixSchema)

let prefixSchema = new mongoose.Schema
({
    guildID: {type: String, unique: true},
    prefix: {type: String}
})
