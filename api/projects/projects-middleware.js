// add middlewares here related to projects
const Project = require("./projects-model")

async function validateProjectId(req, res, next) {
    try { 
        const project = await Project.get(req.params.id);
        if (!project) {
            next({ status: 404, message: "project not found"})
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.staus(500).json({
            message: "cannot find project"
        })
    }
}

function validateProject(req, res, next) {
    const { name } = req.body
    if(!name) {
        res.status(400).json({message: "name required"})
    } else {
        req.name = name
        next()
    }
}


module.exports = { validateProjectId, validateProject }