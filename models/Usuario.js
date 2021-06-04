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
            lista = (await sql.query("select id, nome, email, senha from usuario order by nome asc"));
        });
        return lista || [];
    }
    static async obter(id) {
        let lista = null;
        await app.sql.connect(async (sql) => {
            lista = (await sql.query("select id, nome, email, senha from usuario where id = ?", [
                id,
            ]));
        });
        return (lista && lista[0]) || null;
    }
    static async criar(p) {
        let erro;
        if ((erro = Usuario.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("insert into usuario (nome,email,senha) values (?,?,?)", [p.nome, p.email, p.senha]);
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
    static async alterar(p) {
        let erro;
        if ((erro = Usuario.validar(p)))
            return erro;
        await app.sql.connect(async (sql) => {
            try {
                await sql.query("update usuario set nome = ?, set email = ?, set senha = ? where id = ?", [
                    p.nome,
                    p.email,
                    p.senha,
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