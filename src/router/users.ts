import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAutheticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isAutheticated,getAllUsers);
    router.delete('/users/:id', isAutheticated, isOwner,deleteUser);
    router.patch('/users/:id', isAutheticated, isOwner, updateUser);
};