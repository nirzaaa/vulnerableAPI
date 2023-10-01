import express from 'express';

import authentication from './authentication';
import buy from './items';
import sell from './items';
import request_money from './items';
import users from './users';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    buy(router);
    sell(router);
    request_money(router);
    users(router);
    

    return router;
};