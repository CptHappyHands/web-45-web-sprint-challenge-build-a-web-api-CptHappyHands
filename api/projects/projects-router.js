// Write your "projects" router here!
const express = require('express')
const Project = require("./projects-model")
const router = express.Router()
const { validateProjectId, validateProject } = require("./projects-middleware")

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


router.post("/projects", (req, res, next) => {
    const newProject = req.body
    if(!newProject.description || !newProject.name) {
        res.status(400).json({ message: "text input required" })
    } else {
        Project.insert(newProject)
            .then(({ id }) => {
                return Project.get(id)
            })
            .then((project) => {
                res.status(201).json(project)
            })
            .catch((err) => {
                next(err)
            })
    }
    // Project.insert(req.body)
    //     .then((newProject) => {
    //         res.status(201).json(newProject)
    //     })
    //     .catch((err) => {
    //         next(err)
    //     })
})

router.put("/projects/:id", async (req, res, next) => {
    const updateProject = req.body
    if(!updateProject.description || !updateProject.name || updateProject.completed == req.completed) {
        res.status(400).json({ message: "text input required" })
    } else {
        Project.get(req.params.id)
            .then((project) => {
                if(!project) {
                    res.status(404).json({ message: "This ID does not exist"})
                } else {
                    return Project.update(req.params.id, req.body)
                }
            })
            .then((data) => {
                if (data) {
                    return Project.get(req.params.id, req.body)
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

router.delete('/projects/:id', async (req, res, next) => {
    try {
        const projectPost = await Project.get(req.params.id)
        if(!projectPost) {
            res.status(404).json({ message: "Cannot delete because this ID does not exist"})
        } else {
            await Project.remove(req.params.id)
            res.status(200).json(projectPost)
        }
    } catch(err) {
        next(err)
    }
})

router.get("/projects/:id/actions", async (req, res, next) => {
    try {
        const projectPost = await Project.get(req.params.id)
        if(!projectPost) {
            res.status(404).json({ message: "Cannot find this user"})
        } else {
            const actions = await Project.getProjectActions(req.params.id)
                res.status(200).json(actions)
        }
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
