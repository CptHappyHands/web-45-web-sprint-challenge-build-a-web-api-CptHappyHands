// Write your "projects" router here!
const express = require('express')
const Project = require("./projects-model")
const router = express.Router()

router.get("/projects", (req, res, next) => {

})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "Nothing good hapening in posts",
        message: err.message,
        stack: err.stack
    })
})

module.exports = router
