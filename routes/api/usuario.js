"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const app = require("teem");
const Usuario = require("../../models/Usuario");
class UsuarioApiRoute {
    async listar(req, res) {
        let lista = await Usuario.listar();
        res.json(lista);
    }
    async obter(req, res) {
        let erro = null;
        let id = parseInt(req.params["id"]);
        let Usuario = null;
        if (isNaN(id)) {
            erro = "Id inválido";
        }
        else {
            Usuario = await Usuario.obter(id);
            if (!Usuario) {
                erro = "Usuario não encontrado!";
            }
        }
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(Usuario);
        }
    }
    async criar(req, res) {
        let erro = null;
        let Usuario = req.body;
        erro = await Usuario.criar(Usuario);
        if (erro) {
            res.status(400).json(erro);
        }
        else {
            res.json(true);
        }
    }
    async alterar(req, res) {
        let erro = null;
        let Usuario = req.body;
        erro = await Usuario.alterar(Usuario);
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
            erro = await Usuario.excluir(id);
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
], UsuarioApiRoute.prototype, "obter", null);
__decorate([
    app.http.post(),
    app.route.formData()
], UsuarioApiRoute.prototype, "criar", null);
__decorate([
    app.http.post(),
    app.route.formData()
], UsuarioApiRoute.prototype, "alterar", null);
__decorate([
    app.route.methodName("/excluir/:id")
], UsuarioApiRoute.prototype, "excluir", null);
module.exports = UsuarioApiRoute;
//# sourceMappingURL=usuario.js.map