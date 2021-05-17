"use strict";
const app = require("teem");
class Usuario {
    static validar(p) {
        if (!p)
            return "Usuario inválido";
        p.nome = (p.nome || "").normalize().trim();
        if (p.nome.length < 3 || p.nome.length > 50)
            return "Nome inválido";
        return null;
    }
    static async listar() {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select id, nome, tipo, email, senha, idRegiao from Usuario order by nome asc"));
        });
        return lista || [];
    }
    async obter(id) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select id, nome, tipo, email, senha, idRegiao from usuario where id = ?", [
                id,
            ]));
        });
        return (lista && lista[0]) || null;
    }
    async criar(p) {
        let erro;
        if ((erro = Usuario.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into usuario (nome,tipo,email,senha,idRegiao) values (?,?,?,?,?)", [p.nome]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    erro = `O Usuario ${p.nome} já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    async alterar(p) {
        let erro;
        if ((erro = Usuario.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("update usuario set nome = ?, set tipo = ?, set email = ?, set senha = ?, set idRegiao = ? where id = ?", [
                    p.nome,
                    p.tipo,
                    p.email,
                    p.senha,
                    p.idRegiao,
                    p.id,
                ]);
                if (!sql.affectedRows)
                    erro = "Usuario não encontrado";
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    erro = `O Usuario ${p.nome} já existe`;
                else
                    throw e;
            }
        });
        return erro;
    }
    static async excluir(id) {
        let erro = null;
        await app.sql.connect(async (sql) => {
            await sql.query("delete from usuario where id = ?", [id]);
            if (!sql.affectedRows)
                erro = "Usuario não encontrado";
        });
        return erro;
    }
}
module.exports = Usuario;
//# sourceMappingURL=Usuario.js.map