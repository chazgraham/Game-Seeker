const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('friends')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveGame: async (parent, { gameToSave }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedGames: gameToSave } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        wishlist: async (parent, { gameToSave }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { wishlistGames: gameToSave } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        played: async (parent, { gameToSave }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { playedGames: gameToSave } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        deleteGame: async (parent, { gameId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedGames: { gameId: gameId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        deleteWishlistGame: async (parent, { gameId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { wishlistGames: { gameId: gameId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        deletePlayedGame: async (parent, { gameId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { playedGames: { gameId: gameId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    }
}

module.exports = resolvers;