module.exports = (app, db) => {
    const dbMongo = db
    return {
        /** 
         * @description get all orders
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        get: (req, res) => {
            getOrder(req, res, dbMongo)
        },
        /** 
         * @description delete a order
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        delete: (req, res) => {
            deleteOrder(req, res, dbMongo)
        },
        /** 
         * @description create a new order
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        create: (req, res) => {
            createOrder(req, res, dbMongo)
        },
        /** 
         * @description update a order
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        update: (req, res) => {
            updateOrder(req, res, dbMongo)
        },
        /** 
         * @description update part from a specific order
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        updatePart: (req, res) => {
            updatePart(req, res, dbMongo)
        },
        /** 
         * @description update state order
         * @param {req} req
         * @param {res} res
         * @param {db} dbMongo
        */
        updateState: (req, res) => {
            updateStateOrder(req, res, dbMongo);
        }
    }
}

const collection = 'orders'

function getOrder(req, res, dbMongo) {
    try {
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    message: 'Something is wrong, error ocurred.',
                    error: err
                })
            } else {
                dbMongo.getDB().collection(collection).find({}).toArray((err, documents) => {
                    if (err)
                        res.json({
                            message: 'Something is wrong with the documents',
                            err
                        })
                    else {
                        res.json(documents)
                    }
                })
            }
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong, error ocurred.',
            error: error
        })
    }
}

function deleteOrder(req, res, dbMongo) {
    try {
        const _idDocument = req.params._id
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    err
                })
            } else {
                dbMongo.getDB().collection(collection).findOneAndDelete({
                    _id: dbMongo.getObjectIdDocument(_idDocument)
                }, (err, result) => {
                    if (err)
                        res.json({
                            message: 'Something is wrong',
                            err
                        })
                    else
                        res.json(result);
                })
            }
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong',
            error
        })
    }
}

function createOrder(req, res, dbMongo) {
    try {
        dbMongo.connection(err => {
            let user = req.body
            dbMongo.getDB().collection(collection).insertOne(user, (err, response) => {
                if (err) {
                    res.json({
                        message: 'Something is wrong',
                        err
                    })
                } else {
                    res.json(response)
                }
            })
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong',
            error
        })
    }
}

function updateOrder(req, res, dbMongo) {
    try {
        const userUpdate = req.body
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    message: 'Something is wrong',
                    err
                })
            } else {
                dbMongo.getDB().collection(collection).findOneAndUpdate({
                    _id: dbMongo.getObjectIdDocument(userUpdate._id)
                }, {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        partNo: req.body.partNo,
                        price: req.body.price
                    }
                }, {
                    returnOriginal: false
                }, (err, result) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json(result);
                    }
                });
            }
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong',
            error
        })
    }
}

function updatePart(req, res, dbMongo) {
    try {
        const userUpdate = req.body
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    message: 'Something is wrong',
                    err
                })
            } else {
                dbMongo.getDB().collection(collection).findOneAndUpdate({
                    _id: dbMongo.getObjectIdDocument(userUpdate._id)
                }, {
                    $set: {
                        vehicles: req.body.vehicles
                    }
                }, {
                    returnOriginal: false
                }, (err, result) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json(result);
                    }
                });
            }
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong',
            error
        })
    }
}

function updateStateOrder(req, res, dbMongo) {
    try {
        const userUpdate = req.body
        dbMongo.connection(err => {
            if (err) {
                res.json({
                    message: 'Something is wrong',
                    err
                })
            } else {
                dbMongo.getDB().collection(collection).findOneAndUpdate({
                    _id: dbMongo.getObjectIdDocument(userUpdate._id)
                }, {
                    $set: {
                        status: req.body.status
                    }
                }, {
                    returnOriginal: false
                }, (err, result) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json(result);
                    }
                });
            }
        })
    } catch (error) {
        res.json({
            message: 'Something is wrong',
            error
        })
    }
}