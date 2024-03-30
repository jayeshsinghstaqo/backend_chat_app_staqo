const { authRoutes } = require("./auth.module/routes")

module.exports = (app) => {
    /* Authentication */
    app.use("/v1/auth", authRoutes)
    
}