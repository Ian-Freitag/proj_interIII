"use strict";
const app = require("teem");
class Mapa {
    static async listar() {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select id,mapatipo, idcultura from mapa order by nome asc"));
        });
        return lista || [];
    }
    static async obter(id) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select id,mapatipo, idcultura from mapa where id = ?", [
                id,
            ]));
        });
        return (lista && lista[0]) || null;
    }
    static async criar(p) {
        let erro;
        if ((erro = Mapa.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into mapa (mapatipo,idcultura) values (?,?)", [p.mapatipo, p.idcultura]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    erro = `A Região ${p.mapatipo} já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static async alterar(p) {
        let erro;
        if ((erro = Mapa.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("update mapa set nome = ?, set inicio = ?, set fim = ?", [
                    p.mapatipo,
                    p.idcultura,
                ]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    erro = `A Mapa ${p.mapatipo} já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static validar(p) {
        throw new Error("Method not implemented.");
    }
    static async excluir(id) {
        let erro = null;
        await app.sql.connect(async (sql) => {
            await sql.query("delete from mapa where id = ?", [id]);
            if (!sql.affectedRows)
                erro = "Região não encontrada";
        });
        return erro;
    }
}
module.exports = Mapa;
//# sourceMappingURL=Mapa.js.map