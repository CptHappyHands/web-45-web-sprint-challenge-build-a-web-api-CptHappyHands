// add middlewares here related to projects
const Project = require("./projects-model")

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        if (!project) {
            return []
        } else {
            req.body = project
        }
    } catch (err) {
        res.staus(500).json({
            message: "cannot find project"
        })
    }
}


module.exports = { validateProjectId }