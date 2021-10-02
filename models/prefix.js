const mongoose = require("mongoose");

let prefixSchema = new mongoose.Schema
({
    guildID: {type: String, unique: true},
    prefix: {type: String}
})

module.exports = mongoose.model("prefixes", prefixSchema)
