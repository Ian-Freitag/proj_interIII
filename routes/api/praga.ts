import app = require("teem");
import Praga = require("../../models/Praga");

class PragaApiRoute {
  public async listar(req: app.Request, res: app.Response) {
      let lista = await Praga.listar();

      res.json(lista);
  }

  
  @app.route.methodName("/obter/:id")
  public async obter(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      let Praga: Praga = null;

      if (isNaN(id)) {
          erro = "Id inválido";
      } else {
          Praga = await Praga.obter(id);

          if (!Praga) {
              erro = "Praga não encontrado!";
          }
      }

      if (erro) {
          res.status(400).json(erro);
      } else {
          res.json(Praga);
      }
  }

  @app.http.post()
  @app.route.formData()
  public async criar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let Praga = req.body as Praga;

      erro = await Praga.criar(Praga);

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

      let Praga = req.body as Praga;

      erro = await Praga.alterar(Praga);

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
          erro = await Praga.excluir(id);
      }
      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }
}

export = PragaApiRoute;