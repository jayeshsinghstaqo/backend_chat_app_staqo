function serviceResponse({ status, data, message, error }) {
    this.status = status || 200;
    this.data = data ? data : {};
    this.message = message || "";
    this.error = error || "";
    this.version = '1.0';
};

module.exports = { serviceResponse };
