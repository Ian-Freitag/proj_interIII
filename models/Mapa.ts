import app = require("teem");

class Mapa {
  public id: number;
  public mapatipo: string;
  public idcultura: number;

  public static async listar(): Promise<Mapa[]> {
    let lista: Mapa[] = null;

    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query(
        "select id,mapatipo, idcultura from mapa order by nome asc"
      )) as Mapa[];
    });

    return lista || [];
  }

  public static async obter(id: number): Promise<Mapa> {
    let lista: Mapa[] = null;

    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query("select id,mapatipo, idcultura from mapa where id = ?", [
        id,
      ])) as Mapa[];
    });

    return (lista && lista[0]) || null;
  }

  public static async criar(p: Mapa): Promise<string> {
    let erro: string;
    if ((erro = Mapa.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into mapa (mapatipo,idcultura) values (?,?)", [p.mapatipo,p.idcultura]);
      } catch (e) {
        if (e.code && e.code === "ER_DUP_ENTRY")
          erro = `A Região ${p.mapatipo} já existe`;
        else throw e;
      }
    });
    return erro;
  }
  
  
  public static async alterar(p: Mapa): Promise<string> {
    let erro: string;
    if ((erro = Mapa.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("update mapa set nome = ?, set inicio = ?, set fim = ?", [
          p.mapatipo,
          p.idcultura,
        ]);
      } catch (e) {
        if (e.code && e.code === "ER_DUP_ENTRY")
        erro = `A Mapa ${p.mapatipo} já existe`;
        else throw e;
      }
    });

    return erro;
  }
  static validar(p: Mapa): string {
    throw new Error("Method not implemented.");
  }

  public static async excluir(id: number): Promise<string> {
    let erro: string = null;

    await app.sql.connect(async (sql: app.Sql) => {
      await sql.query("delete from mapa where id = ?", [id]);
      if (!sql.affectedRows) erro = "Região não encontrada";
    });

    return erro;
  }
}

export = Mapa;













