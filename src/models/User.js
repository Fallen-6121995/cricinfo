const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    loginMethod: {
        type: String,
        required: true,
        enum: ['Google', 'Facebook', 'Twitter', 'Apple'],
        default: 'Google', 
      },
    deviceId: {
      type: String,
      required: false,
      trim: true,
    },
    deviceInfo: {
      type: Object,
      required: false,
      default: null, 
      properties: {
        platform: { type: String }, // e.g., 'iOS' or 'Android'
        osVersion: { type: String }, // e.g., '16.0'
        model: { type: String }, // e.g., 'iPhone 14 Pro'
      },
    },
    fcmToken: {
      type: String,
      required: false,
      trim: true,
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
);

// Add indexing for optimized queries
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ deviceId: 1 });

const User = mongoose.model('User', UserSchema);

module.exports = User;