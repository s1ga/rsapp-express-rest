class serverError extends Error {
  constructor(status, message = status.message) {
    super(message);
    this.serverStatus = status.status;
  }
}

module.exports = serverError;
