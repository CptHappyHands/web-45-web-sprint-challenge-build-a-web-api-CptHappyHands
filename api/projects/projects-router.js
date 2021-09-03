// Write your "projects" router here!
const express = require('express')
const Project = require("./projects-model")
const router = express.Router()
const { validateProjectId } = require("./projects-middleware")

router.get("/projects", (req, res, next) => {
    Project.get()
        .then((project) => {
            if(!project) {
                return []
            } else {
                res.status(200).json(project)
            }
        })
        .catch((err) => {
            next(err)
        })
    
})

router.get("/projects/:id", validateProjectId, async (req, res, next) => {
    try {
        res.status(200).json(req.project)
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
