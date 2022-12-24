const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction,

} = require('../../controllers/thoughtController');

// route to /api/thoughts
router.route('/')
.get(getAllThoughts)

// route to : /api/thoughts/:id 
router.route('/:id')
.get(getThoughtsById)
.put(updateThoughts)
.delete(deleteThoughts);

// route to /api/thoughts/:userID
router.route('/:userId').post(createThoughts);

// route to : /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction);

// route to /api/thoughts/:thoughtId/reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;