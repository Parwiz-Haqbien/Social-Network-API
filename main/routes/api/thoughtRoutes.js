const router = require('express').Router();  


const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    addReaction,
    updateThought,
    deleteThought,
    deleteReaction
} = require('../../controllers/thoughtController');

router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

router
.route('/:id')
.get(getThoughtsById)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(addReaction)

router
.route('/:thoughtId/reactionId')
.delete(deleteReaction)

module.exports = router