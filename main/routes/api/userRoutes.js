const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// route to /api/users
router.route('/')
.get(getAllUsers)
.post(createUsers);

// route to /api/users/:id
router.route('/:id')
.get(getUsersById)
.put(updateUsers)
.delete(deleteUsers)

// route to /api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;