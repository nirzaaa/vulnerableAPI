import express from 'express';

import { getUserByEmail } from '../db/users';
import { createItem, getItemByName } from '../db/items';

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

export const buy = async (req: express.Request, res: express.Response) => {
    try {
        const { email, item_name } = req.body;

        if ( !email || !item_name ) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email).select('+money');

        if ( !existingUser ) {
            return res.sendStatus(400);
        }

        const requestedItem = await getItemByName(item_name).select('+price');

        if ( !requestedItem ) {
            return res.sendStatus(400);
        }

        if ( requestedItem.price > existingUser.money ) {
            console.log('Not enough money!')
            return res.sendStatus(400);
        }
        
        existingUser.money -= requestedItem.price;
        existingUser.item = requestedItem.name;

        await existingUser.save()

        return res.status(200).json(existingUser).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const sell = async (req: express.Request, res: express.Response) => {
    try {
        const { email, item_name } = req.body;

        if ( !email || !item_name ) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email).select('+money');

        if ( !existingUser ) {
            return res.sendStatus(400);
        }

        const requestedItem = await getItemByName(item_name).select('+price +item');

        if ( !requestedItem ) {
            return res.sendStatus(400);
        }

        if ( existingUser.item != requestedItem.name ) {
            console.log("User does not have this item!");
            return res.sendStatus(400);
        }

        existingUser.money += requestedItem.price;
        existingUser.item = 'nothing';

        await existingUser.save()

        return res.status(200).json(existingUser).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const request_money = async (req: express.Request, res: express.Response) => {
    try {
        const { email, money_to_add } = req.body;

        if ( !email || !money_to_add ) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email).select('+money');

        if ( !existingUser ) {
            return res.sendStatus(400);
        }
        
        if ( money_to_add > 99 || existingUser.requested_money == 1 ) {
            return res.sendStatus(400);
        }

        existingUser.money += money_to_add;
        existingUser.requested_money = 1;

        await existingUser.save()

        return res.status(200).json(existingUser).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const add_item = async (req: express.Request, res: express.Response) => {
    try {
        const { name, price } = req.body;

        if ( !name || !price ) {
            return res.sendStatus(400);
        }

        const newItem = await getItemByName(name);

        if ( newItem ) {
            return res.sendStatus(400);
        }
        
        const item = await createItem({
            name,
            price
        });

        return res.status(200).json(item).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
