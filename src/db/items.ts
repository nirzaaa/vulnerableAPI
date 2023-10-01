import mongoose, { mongo } from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
});

export const ItemModel = mongoose.model('Item', ItemSchema);

export const getItemByName = (name: string) => ItemModel.findOne({ name });
export const createItem = (values: Record<string, any>) => new ItemModel(values).save().then((item) => item.toObject());