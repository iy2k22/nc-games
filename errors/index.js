const handle404Errors = (req, res) => {
    res.status(404).send({ msg: "error: invalid path" });
}

const handle500Errors = (err, req, res) => {
    res.status(500).send({ msg: "internal server error"});
}
module.exports = {
    handle404Errors,
    handle500Errors
}