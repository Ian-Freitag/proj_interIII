import app = require("teem");
import converterDataISO = require("../utils/converterDataISO");


class Praga {
  public id: number;
  public nome: string;
  public inicio: string;
  public fim: string;

  public static async listar(): Promise<Praga[]> {
    let lista: Praga[] = null;
    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query(
        "select id, nome, inicio, fim from praga order by nome asc"
      )) as Praga[];
    });

    return lista || [];
  }

  public static async obter(id: number): Promise<Praga> {
    let lista: Praga[] = null;
    
    await app.sql.connect(async (sql:app.Sql) => {
      lista = (await sql.query("select id, nome, inicio, fim from praga where id = ?", [
        id,
      ])) as Praga[];
    });

    return (lista && lista[0]) || null;
  }

  public static async criar(p: Praga): Promise<string> {
    let erro: string;
    if((erro = Praga.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert int praga (nome, inicio, fim) values (?,?,?)", [p.nome,p.inicio,p.fim]);
      } catch (e) {
        if (e.cod && e.code === "ER_DUP_ENTRY")
        erro = `A Praga ${p.nome} já existe`;
        else throw e;
      }
    });

    return erro;
  }
  static validar(p: Praga): string {
    throw new Error("Method not implemented.");
  }

  public async alterar(p: Praga): Promise<string> {
    let erro: string;
    if ((erro = Praga.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("update praga set nome = ?, set inicio = ?, set fim = ?", [
          p.nome,
          p.inicio,
          p.fim,
        ]);
      } catch (e) {
        if (e.code && e.code === "ER_DUP_ENTRY")
        erro = `A Praga ${p.nome} já existe`;
        else throw e;
      }
    });

    return erro;
  }

  public static async excluir(id: number): Promise<string> {
    let erro: string = null;

    await app.sql.connect(async (sql: app.Sql) => {
      await sql.query("delete from praga where id = ?", [id]);
      if (!sql.affectedRows) erro = "Praga não encontrada";
    });

    return erro;
  }
}

export = Praga;