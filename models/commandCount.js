const mongoose = require("mongoose");

let commandCountSchema = new mongoose.Schema
({
    command: {type: String, unique: true},
    count: {type: Number}
})

module.exports = mongoose.model("commandcounts", commandCountSchema)
