const mongoose = require('mongoose');

const CountriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
          },
        flag:{
            type: String,
            required:true,
        },
        countryCode:{
            type: String,
            required:true,
        },
        description:{
            type: String,
            required:true,
        },
        status: {
            type: Number,
            required: true,
            enum: [0,1],
            default: 1, 
          },
        createdAt: {
            type: Date,
            default: Date.now,
          },
          updatedAt: {
            type: Date,
            default: Date.now,
          },
        },
        {
          timestamps: true, // Automatically includes createdAt and updatedAt fields
        }
)

const News = mongoose.model('News', CountriesSchema);
module.exports = News;