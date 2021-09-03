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


router.post("/", (req, res, next) => {
    const newAction = req.body
    if(!newAction.description || !newAction.notes || !newAction.project_id) {
        res.status(400).json({ message: "text input required" })
    } else {
        Action.insert(newAction)
            .then(({ id }) => {
                return Action.get(id)
            })
            .then((action) => {
                res.status(201).json(action)
            })
            .catch((err) => {
                next(err)
            })
    }
})

router.put("/:id", async (req, res, next) => {
    const updateAction = req.body
    if(!updateAction.description || !updateAction.notes || !updateAction.project_id || updateAction.completed == req.completed) {
        res.status(400).json({ message: "text input required" })
    } else {
        Action.get(req.params.id)
            .then((action) => {
                if(!action) {
                    res.status(404).json({ message: "This ID does not exist"})
                } else {
                    return Action.update(req.params.id, req.body)
                }
            })
            .then((data) => {
                if (data) {
                    return Action.get(req.params.id, req.body)
                }
            })
            .then((moreData) => {
                if (moreData) {
                    res.json(moreData)
                }
            })
            .catch((err) => {
                next(err)
            })
    }
})


router.delete("/:id", async (req, res, next) => {
    try {
        const actionData = await Action.get(req.params.id)
        if(!actionData) {
            res.status(404).json({ message: "Cannot delete because this ID does not exist"})
        } else {
            await Action.remove(req.params.id)
            res.status(200).json(actionData)
        }
    } catch(err) {
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