import app = require("teem");

class Regiao {
  public id: number;
  public regiaotipo: string;
  public idcultura: number;

  public static async listar(): Promise<Regiao[]> {
    let lista: Regiao[] = null;

    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query(
        "select id,regiaotipo, idcultura from regiao order by nome asc"
      )) as Regiao[];
    });

    return lista || [];
  }

  public static async obter(id: number): Promise<Regiao> {
    let lista: Regiao[] = null;

    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query("select id,regiaotipo, idcultura from regiao where id = ?", [
        id,
      ])) as Regiao[];
    });

    return (lista && lista[0]) || null;
  }

  public static async criar(p: Regiao): Promise<string> {
    let erro: string;
    if ((erro = Regiao.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into regiao (regiaotipo,idcultura) values (?,?)", [p.regiaotipo,p.idcultura]);
      } catch (e) {
        if (e.code && e.code === "ER_DUP_ENTRY")
          erro = `A Região ${p.regiaotipo} já existe`;
        else throw e;
      }
    });
    return erro;
  }
  
  
  public static async alterar(p: Regiao): Promise<string> {
    let erro: string;
    if ((erro = Regiao.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("update regiao set nome = ?, set inicio = ?, set fim = ?", [
          p.regiaotipo,
          p.idcultura,
        ]);
      } catch (e) {
        if (e.code && e.code === "ER_DUP_ENTRY")
        erro = `A Regiao ${p.regiaotipo} já existe`;
        else throw e;
      }
    });

    return erro;
  }
  static validar(p: Regiao): string {
    throw new Error("Method not implemented.");
  }

  public static async excluir(id: number): Promise<string> {
    let erro: string = null;

    await app.sql.connect(async (sql: app.Sql) => {
      await sql.query("delete from regiao where id = ?", [id]);
      if (!sql.affectedRows) erro = "Região não encontrada";
    });

    return erro;
  }
}

export = Regiao;













