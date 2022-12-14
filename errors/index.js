const handle404Errors = (req, res) => {
    res.status(404).send({ msg: "error: invalid path" });
}

module.exports = {
    handle404Errors
}