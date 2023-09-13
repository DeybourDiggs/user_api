const { validationResult, body } = require("express-validator");
const User = require("../models/Users");

// Create a User
exports.create_user = [
    body('name').trim().isLength({ min: 1 }).escape(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.create(req.body);
            const { user_id, name } = user;
            res.status(201).json({ user_id, name });
        } catch (error) {
            res.status(500).json({ error: 'Unable to create a user.' });
        }
    },
];

// Retreive User by Id
exports.fetch_user = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const { user_id, name } = user; // Extract user_id and name
    res.status(201).json({ user_id, name });
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve the user." });
  }
};

// Update User

exports.update_user = async(req, res) => {
    try {
        const user = await User.findOneAndUpdate({ user_id: req.params.user_id }, req.body, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const { user_id, name } = user;
        res.status(201).json({ user_id, name });
    } catch (error) {
        res.status(500).json({ error: 'Unable to update the user.' });
    }
}

// Delete User
exports.delete_user = async(req,res) => {
    try {
        const user = await User.findOneAndDelete({ user_id: req.params.user_id });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const { user_id, name } = user;
        res.status(201).json({ user_id, name });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete the user.' });
    }
}
