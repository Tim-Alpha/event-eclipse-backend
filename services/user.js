import User from '../models/user.js';

class UserService {
    async createUser(userData) {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            throw new Error('Could not create user');
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (error) {
            throw new Error('Could not find user');
        }
    }

    async updateUser(userId, userData) {
        try {
            const user = await User.findByPk(userId);
            if (!user) throw new Error('User not found');
            await user.update(userData);
            return user;
        } catch (error) {
            throw new Error('Could not update user');
        }
    }

    async deleteUser(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) throw new Error('User not found');
            await user.destroy();
            return user;
        } catch (error) {
            throw new Error('Could not delete user');
        }
    }
}

export default new UserService();
