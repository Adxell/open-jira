import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';


type Data = 
 | { message: string }
 | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse){
    const {id} = req.query 

    if( !mongoose.isValidObjectId(id) ){
        return res.status(400).json({ message: 'Id no valid'})
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry( req, res )
        case 'GET':
            return getEntry( req, res )
        default:
            return res.status(400).json({ message: 'method dosent exist'})
    }
}

const updateEntry = async( req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.query 
    await db.connect()
    const entryToUpdate = await Entry.findById(id);

    if( !entryToUpdate ) {
        await db.disconnect()
        return res.status(400).json( { message: 'Dosnt entry with that id'} )
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body; 
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, {runValidators: true, new: true})
        await db.disconnect()
        res.status(200).json( updatedEntry! )
    } catch (error) {
        await db.disconnect()
        res.status(400).json({ message: 'bad request' })
    }
}

const getEntry = async(req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.query  
    await db.connect()
    const EntryFined = await Entry.findById(id)
    await db.disconnect()

    if( !EntryFined ) {
        await db.disconnect()
        return res.status(400).json( { message: 'Dosnt entry with that id'} )
    }

    return res.status(200).json(EntryFined)
}