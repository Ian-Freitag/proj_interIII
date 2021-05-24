"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const app = require("teem");
const Praga = require("../../models/Praga");
class PragaApiRoute {
    async listar(req, res) {
        let lista = await Praga.listar();
        res.json(lista);
    }
    async obter(req, res) {
        let erro = null;
        let id = parseInt(req.params["id"]);
        let praga = null;
        if (isNaN(id)) {
            erro = "Id inválido";
        }
        else {
            praga = await Praga.obter(id);
            if (!Praga) {
                erro = "Praga não encontrado!";
            }
        }
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(Praga);
        }
    }
    async criar(req, res) {
        let erro = null;
        let praga = req.body;
        erro = await Praga.criar(praga);
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(true);
        }
    }
    async alterar(req, res) {
        let erro = null;
        let Praga = req.body;
        erro = await Praga.alterar(Praga);
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(true);
        }
    }
    async excluir(req, res) {
        let erro = null;
        let id = parseInt(req.params["id"]);
        if (isNaN(id)) {
            erro = "Id inválido";
        }
        else {
            erro = await Praga.excluir(id);
        }
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(true);
        }
    }
}
__decorate([
    app.route.methodName("/obter/:id")
], PragaApiRoute.prototype, "obter", null);
__decorate([
    app.http.post(),
    app.route.formData()
], PragaApiRoute.prototype, "criar", null);
__decorate([
    app.http.post(),
    app.route.formData()
], PragaApiRoute.prototype, "alterar", null);
__decorate([
    app.route.methodName("/excluir/:id")
], PragaApiRoute.prototype, "excluir", null);
module.exports = PragaApiRoute;
//# sourceMappingURL=praga.js.map