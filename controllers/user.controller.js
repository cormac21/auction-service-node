
function index(req, res) {
    const user = "User list";
    res.send(user);
}

module.exports = {
    index: index
}
