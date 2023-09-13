const router = require('express').Router();
const userController = require('../controllers/User');

// Create a new user
router.post('/', userController.create_user),

// Retrieve a user by its Id
router.get('/:user_id' , userController.fetch_user)

// Update a user by its id
router.put('/:user_id', userController.update_user)

// Delete a user by its id

router.delete('/:user_id', userController.delete_user)

module.exports = router