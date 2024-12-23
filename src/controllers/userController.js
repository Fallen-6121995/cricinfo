const User = require("../models/User");


exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
      const newUser = new User({ name, email });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.loginUser = async (req, res) => {
    const { email, loginMethod } = req.body;
    try {
      const user = await User.findOne({ email:email, loginMethod:loginMethod });
      if (!user) {
            return res.status(400).json({ message: "User not found. Please register first." });
        }
        return res.status(200).json({ 
            message: "Login successful.", 
            user 
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  