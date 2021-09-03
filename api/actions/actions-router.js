// Write your "actions" router here!
const express = require('express')
const Action = require("./actions-model")
const router = express.Router()
const { validateActionId } = require("./actions-middlware")

router.get("/", (req, res, next) => {
    Action.get()
        .then((action) => {
            if(!action) {
                return []
            } else {
                res.status(200).json(action)
            }
        })
        .catch((err) => {
            next(err)
        })
})

router.get("/:id", validateActionId, async (req, res, next) => {
    try {
        res.status(200).json(req.action)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "Nothing good hapening in posts",
        message: err.message,
        stack: err.stack
    })
})



module.exports = router