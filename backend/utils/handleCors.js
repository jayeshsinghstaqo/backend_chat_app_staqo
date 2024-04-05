exports.handleCors = (req, res, next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    } catch (err) {
        return res.send({ status: 404, error: err.message })
    }
}