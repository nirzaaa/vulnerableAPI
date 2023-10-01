import express from 'express';

import { buy, request_money, sell, add_item } from '../controllers/items';

export default (router: express.Router) => {
    router.post('/item/buy', buy);
    router.post('/item/sell', sell);
    router.post('/item/request_money', request_money);
    router.post('/item/add_item', add_item);
};