"use strict";
const app = require("teem");
class Regiao {
    static async listar() {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select id,regiaotipo, idcultura from Regiao order by nome asc"));
        });
        return lista || [];
    }
    async obter(id) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select id,regiaotipo, idcultura from usuario where id = ?", [
                id,
            ]));
        });
        return (lista && lista[0]) || null;
    }
    async criar(p) {
        let erro;
        if ((erro = Regiao.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into regiao (regiaotipo,idcultura) values (?,?)", [p.regiaotipo]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    erro = `A Região ${p.regiaotipo} já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    async alterar(p) {
        let erro;
        if ((erro = Regiao.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("update regiao set nome = ?, set inicio = ?, set fim = ?", [
                    p.regiaotipo,
                    p.idcultura,
                ]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    erro = `A Regiao ${p.regiaotipo} já existe`;
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
            await sql.query("delete from regiao where id = ?", [id]);
            if (!sql.affectedRows)
                erro = "Região não encontrada";
        });
        return erro;
    }
}
module.exports = Regiao;
//# sourceMappingURL=Regiao.js.map