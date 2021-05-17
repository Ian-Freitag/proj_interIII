import app = require("teem");
import Cultura = require("../../models/Cultura");

class CulturaApiRoute {
  public async listar(req: app.Request, res: app.Response) {
      let lista = await Cultura.listar();

      res.json(lista);
  }

  
  @app.route.methodName("/obter/:id")
  public async obter(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      let Cultura: Cultura = null;

      if (isNaN(id)) {
          erro = "Id inválido";
      } else {
          Cultura = await Cultura.obter(id);

          if (!Cultura) {
              erro = "Cultura não encontrado!";
          }
      }

      if (erro) {
          res.status(400).json(erro);
      } else {
          res.json(Cultura);
      }
  }

  @app.http.post()
  @app.route.formData()
  public async criar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let Cultura = req.body as Cultura;

      erro = await Cultura.criar(Cultura);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }

  @app.http.post()
  @app.route.formData()
  public async alterar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let Cultura = req.body as Cultura;

      erro = await Cultura.alterar(Cultura);

      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }

  @app.route.methodName("/excluir/:id")
  public async excluir(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      if(isNaN(id)){
          erro = "Id inválido";
      } else{
          erro = await Cultura.excluir(id);
      }
      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }
}

export = CulturaApiRoute;