"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const app = require("teem");
class IndexRoute {
    async index(req, res) {
        res.render("index.ejs", {
            layout: "layout-home",
        });
    }
    async cadastrar(req, res) {
        res.render("cadastrar.ejs", {
            layout: "layout-home",
        });
    }
    async mapa(req, res) {
        res.render("mapa.ejs", {
            layout: "layout-mapa",
        });
    }
    async dadosBanca(req, res) {
        res.render("login.ejs", {
            layout: "layout-home",
        });
        return;
    }
}
__decorate([
    app.route.methodName(app.root + "/cadastrar")
], IndexRoute.prototype, "cadastrar", null);
__decorate([
    app.route.methodName(app.root + "/mapa")
], IndexRoute.prototype, "mapa", null);
__decorate([
    app.route.methodName(app.root + "/login")
], IndexRoute.prototype, "dadosBanca", null);
module.exports = IndexRoute;
//# sourceMappingURL=index.js.map