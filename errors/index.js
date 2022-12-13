const handleUserErrors = (err, req, res, next) => {
    if (err) console.log(err);
}

module.exports = {
    handleUserErrors
}