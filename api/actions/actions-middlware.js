// add middlewares here related to actions
const Action = require("./actions-model")

async function validateActionId(req, res, next) {
    try { 
        const action = await Action.get(req.params.id);
        if (!action) {
            next({ status: 404, message: "action not found"})
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.staus(500).json({
            message: "cannot find action"
        })
    }
}

module.exports = { validateActionId }