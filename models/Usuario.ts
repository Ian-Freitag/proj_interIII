import app = require("teem");

class Usuario {
  public id: number;
  public nome: string;
  public tipo: number;
  public email: string;
  public senha: string;
  public idRegiao: number;

  private static validar(p: Usuario): string {
    if (!p) return "Usuario inválido";

    p.nome = (p.nome || "").normalize().trim();
    if (p.nome.length < 3 || p.nome.length > 50) return "Nome inválido";

    return null;
  }
  public static async listar(): Promise<Usuario[]> {
    let lista: Usuario[] = null;

    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query(
        "select id, nome, tipo, email, senha, idRegiao from Usuario order by nome asc"
      )) as Usuario[];
    });

    return lista || [];
  }

  public async obter(id: number): Promise<Usuario> {
    let lista: Usuario[] = null;

    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query("select id, nome, tipo, email, senha, idRegiao from usuario where id = ?", [
        id,
      ])) as Usuario[];
    });

    return (lista && lista[0]) || null;
  }

  public async criar(p: Usuario): Promise<string> {
    let erro: string;
    if ((erro = Usuario.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into usuario (nome,tipo,email,senha,idRegiao) values (?,?,?,?,?)", [p.nome]);
      } catch (e) {
        if (e.code && e.code === "ER_DUP_ENTRY")
          erro = `O Usuario ${p.nome} já existe`;
        else throw e;
      }
    });

    return erro;
  }

  public async alterar(p: Usuario): Promise<string> {
    let erro: string;
    if ((erro = Usuario.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("update usuario set nome = ?, set tipo = ?, set email = ?, set senha = ?, set idRegiao = ? where id = ?", [
          p.nome,
          p.tipo,
          p.email,
          p.senha,
          p.idRegiao,
          p.id,
        ]);
        if (!sql.affectedRows) erro = "Usuario não encontrado";
      } catch (e) {
        if (e.code && e.code === "ER_DUP_ENTRY")
          erro = `O Usuario ${p.nome} já existe`;
        else throw e;
      }
    });

    return erro;
  }

  public static async excluir(id: number): Promise<string> {
    let erro: string = null;

    await app.sql.connect(async (sql: app.Sql) => {
      await sql.query("delete from usuario where id = ?", [id]);
      if (!sql.affectedRows) erro = "Usuario não encontrado";
    });

    return erro;
  }
}

export = Usuario;
