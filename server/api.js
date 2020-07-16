import { ObjectID } from 'mongodb'
import { Router } from 'express'
import { phonebooks } from './mongo'

export default () => {
    let api = Router()
    api.get('/test', async (req, res, next) => {
        res.json({ status: 'test completed'})
    })

    api.get('/phonebooks', async (req, res, next) => {
        let pbList
        try {
            pbList = 
                await phonebooks.find({})
                .sort({_id: -1})
                .toArray()
                .then(list => {
                    return list.map(d => {
                        d['id'] = d['_id']
                        delete d["_id"]
                        return d
                    })
                })
            res.json({ status: 200, data: pbList })
        } catch (e) {
            console.log(e)
            throw e
        }
    })
    
    api.post('/phonebook', async (req, res, next) => {
        console.log('req.body: ', req.body)
        const newID = ObjectID()
        try {
            await phonebooks.insertOne({
                _id: newID,
                name: req.body.name,
                phone: req.body.phone,
                timestamp: new Date()
            })
            res.json({ status: 200, id: newID })
        } catch (e) {
            console.log(e)
            res.json({ status: e.message })
            throw e
        }
    })
    
    api.delete('/phonebook/:phoneBookId', async (req, res, next) => {
        console.log('req.params: ', req.params)
        try {
            await phonebooks.removeOne({ _id: ObjectID(req.params.phoneBookId) })
            res.json({ status: 200 })
        } catch (e) {
            console.log(e)
            res.json({ status: e.message})
            throw e
        }
    })
	return api;
}
