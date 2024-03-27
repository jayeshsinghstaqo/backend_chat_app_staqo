module.exports = {
    _auth_module: {
        created: (name) => `${name || "Account"} created successfully.`,
        login: (name) => `${name || "Account"} login successfully.`,
        allReadyExist: (key) => `${key || "Data"} already exist.`,
        unAuth: "Unauthorized access.",
        tokenMissing: "Token missing, Please login again."
    },
    _middleware: {
        dbNotInitDB: (name) => `DB not initialize for ${name}.`,
        require: (name) => `${name} is required.`
    },
    _query: {
        add: (key) => `${key || "Record"} add successfully.`,
        get: (key) => `${key || "Record"} fetched successfully.`,
        update: (key) => `${key || "Record"} update successfully.`,
        notFound: (key) => `${key || "Record"} not found.`,
        invalid : (key) => `Invalid ${key}.`
    },

}