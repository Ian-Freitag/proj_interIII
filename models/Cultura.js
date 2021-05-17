"use strict";
const app = require("teem");
class Cultura {
    static async listar() {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select id, nome, idPraga from Praga order by nome asc"));
        });
        return lista || [];
    }
    static async obter(id) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select id, nome, idPraga from praga where id = ?", [
                id,
            ]));
        });
        return (lista && lista[0]) || null;
    }
    static async criar(p) {
        let erro;
        if ((erro = Cultura.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into praga (nome, idPraga) values (?,?)", [p.nome, p.idPraga]);
            }
            catch (e) {
                if (e.cod && e.code === "ER_DUP_ENTRY")
                    erro = `A Cultura ${p.nome} já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static validar(p) {
        // throw new Error("Method not implemented.");
        return null;
    }
    static async alterar(p) {
        let erro;
        if ((erro = Cultura.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("update cultura set nome = ?, set idPraga = ?", [
                    p.nome,
                    p.idPraga,
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
            await sql.query("delete form cultura where id = ?", [id]);
            if (!sql.affectedRows)
                erro = "Cultura não encontrada";
        });
        return erro;
    }
}
module.exports = Cultura;
//# sourceMappingURL=Cultura.js.map