import app = require("teem");

class Cultura{
  
  public id: number;
  public nome: string;
  public idPraga: number;
 
  public static async listar(): Promise<Cultura[]> {
    let lista: Cultura[] = null;
    
    await app.sql.connect(async (sql: app.Sql) => {
      lista = (await sql.query( 
        "select id, nome, idPraga from cultura order by nome asc"
      )) as Cultura[];
    });

    return lista || [];
  }

  public static async obter(id: number): Promise<Cultura> {
    let lista: Cultura[] = null;
    
    await app.sql.connect(async (sql:app.Sql) => {
      lista = (await sql.query("select id, nome, idPraga from cultura where id = ?", [
        id,
      ])) as Cultura[];
    });

    return (lista && lista[0]) || null;
  }

  public static async criar(p: Cultura): Promise<string> {
    let erro: string;
    if((erro = Cultura.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("insert into cultura (nome, idPraga) values (?,?)", [p.nome,p.idPraga]);
      } catch (e) {
        if (e.cod && e.code === "ER_DUP_ENTRY")
        erro = `A Cultura ${p.nome} já existe`;
        else throw e;
      }
    });

    return erro;
  }
  static validar(p: Cultura): string {
   // throw new Error("Method not implemented.");
    return null;
  }

  public static async alterar(p: Cultura): Promise<string> {
    let erro: string;
    if ((erro = Cultura.validar(p))) return erro;

    await app.sql.connect(async (sql: app.Sql) => {
      try {
        await sql.query("update cultura set nome = ?, set idPraga = ?", [
          p.nome,
          p.idPraga,
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
      await sql.query("delete fromm cultura where id = ?", [id]);
      if (!sql.affectedRows) erro = "Cultura não encontrada";
    });

    return erro;
  }
}

export = Cultura;