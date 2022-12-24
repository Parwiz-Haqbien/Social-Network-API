const { Users } = require('../models');

const UserController = {

    createUsers({body}, res) {
        Users.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    getAllUsers(req, res) {
        Users.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    getUsersById({params}, res) {
        Users.findOne({ _id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json({message: 'No User with this Id!'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    updateUsers({params, body}, res) {
        Users.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(400).json({message: 'No User with this particular ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },
        


    deleteUsers({params}, res) {
        Users.findByIdAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
            res.status(404).json({message: 'No user with this ID'})
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err))
    },


    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: {friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User with this Id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    
    deleteFriend({ params}, res ) {
        Users.findOneAndUpdate({_id: params.id}, {$pull: {friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user with this Id'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err))
    }
};

module.exports = UserController;