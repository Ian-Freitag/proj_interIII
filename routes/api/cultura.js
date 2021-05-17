"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const app = require("teem");
const Cultura = require("../../models/Cultura");
class CulturaApiRoute {
    async listar(req, res) {
        let lista = await Cultura.listar();
        res.json(lista);
    }
    async obter(req, res) {
        let erro = null;
        let id = parseInt(req.params["id"]);
        let Cultura = null;
        if (isNaN(id)) {
            erro = "Id inválido";
        }
        else {
            Cultura = await Cultura.obter(id);
            if (!Cultura) {
                erro = "Cultura não encontrado!";
            }
        }
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(Cultura);
        }
    }
    async criar(req, res) {
        let erro = null;
        let Cultura = req.body;
        erro = await Cultura.criar(Cultura);
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(true);
        }
    }
    async alterar(req, res) {
        let erro = null;
        let Cultura = req.body;
        erro = await Cultura.alterar(Cultura);
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
            erro = await Cultura.excluir(id);
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
], CulturaApiRoute.prototype, "obter", null);
__decorate([
    app.http.post(),
    app.route.formData()
], CulturaApiRoute.prototype, "criar", null);
__decorate([
    app.http.post(),
    app.route.formData()
], CulturaApiRoute.prototype, "alterar", null);
__decorate([
    app.route.methodName("/excluir/:id")
], CulturaApiRoute.prototype, "excluir", null);
module.exports = CulturaApiRoute;
//# sourceMappingURL=cultura.js.map