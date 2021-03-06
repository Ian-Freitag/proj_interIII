import app = require("teem");

class Usuario {
  public id: number;
  public nome: string;
  public email: string;
  public senha: string;

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
        "select id, nome, email, senha from usuario order by nome asc"
      )) as Usuario[];
    });

    return lista || [];
  }

  public static async obter(id: number): Promise<Usuario> {
    let lista: Usuario[] = null;

    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query("select id, nome, email, senha from usuario where id = ?", [
        id,
      ])) as Usuario[];
    });

    return (lista && lista[0]) || null;
  }

  public static async criar(p: Usuario): Promise<string> {
    let erro: string;
    if ((erro = Usuario.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into usuario (nome,email,senha) values (?,?,?)", [p.nome,p.email,p.senha]);
      } catch (e) {
        if (e.code && e.code === "ER_DUP_ENTRY")
          erro = `O Usuario ${p.nome} já existe`;
        else throw e;
      }
    });

    return erro;
  }

  public static async alterar(p: Usuario): Promise<string> {
    let erro: string;
    if ((erro = Usuario.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("update usuario set nome = ?, set email = ?, set senha = ? where id = ?", [
          p.nome,
          p.email,
          p.senha,
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
