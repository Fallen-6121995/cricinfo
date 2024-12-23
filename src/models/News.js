const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
          },
        mainImage:{
            type: String,
            required:true,
            default:"",
        },
        newsLink:{
          type: String,
          required:true,
          unique:true,
          default:"",
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

const News = mongoose.model('News', NewsSchema);
module.exports = News;