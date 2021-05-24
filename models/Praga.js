"use strict";
const app = require("teem");
class Praga {
    static async listar() {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select id, nome, inicio, fim from praga order by nome asc"));
        });
        return lista || [];
    }
    static async obter(id) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select id, nome, inicio, fim from praga where id = ?", [
                id,
            ]));
        });
        return (lista && lista[0]) || null;
    }
    static async criar(p) {
        let erro;
        if ((erro = Praga.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert int praga (nome, inicio, fim) values (?,?,?)", [p.nome, p.inicio, p.fim]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `A Praga ${p.nome} já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static validar(p) {
        throw new Error("Method not implemented.");
    }
    async alterar(p) {
        let erro;
        if ((erro = Praga.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("update praga set nome = ?, set inicio = ?, set fim = ?", [
                    p.nome,
                    p.inicio,
                    p.fim,
                ]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    erro = `A Praga ${p.nome} já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static async excluir(id) {
        let erro = null;
        await app.sql.connect(async (sql) => {
            await sql.query("delete from praga where id = ?", [id]);
            if (!sql.affectedRows)
                erro = "Praga não encontrada";
        });
        return erro;
    }
}
module.exports = Praga;
//# sourceMappingURL=Praga.js.map