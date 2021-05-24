"use strict";
class IndexRoute {
    async index(req, res) {
        res.render("index.ejs", {});
    }
    async cadastrar(req, res) {
        res.render("cadastrar.ejs", {});
    }
}
module.exports = IndexRoute;
//# sourceMappingURL=index.js.map