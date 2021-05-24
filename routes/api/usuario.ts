import app = require("teem");
import Usuario = require("../../models/Usuario");

class UsuarioApiRoute {
  public async listar(req: app.Request, res: app.Response) {
      let lista = await Usuario.listar();

      res.json(lista);
  }

  
  @app.route.methodName("/obter/:id")
  public async obter(req: app.Request, res: app.Response) {
      let erro: string = null;

      let id = parseInt(req.params["id"]);

      let usuario: Usuario = null;

      if (isNaN(id)) {
          erro = "Id inválido";
      } else {
          usuario = await Usuario.obter(id);

          if (!Usuario) {
              erro = "Usuario não encontrado!";
          }
      }

      if (erro) {
          res.status(400).json(erro);
      } else {
          res.json(Usuario);
      }
  }

  @app.http.post()
  @app.route.formData()
  public async criar(req: app.Request, res: app.Response) {
      let erro: string = null;

      let usuario = req.body as Usuario;

      erro = await Usuario.criar(usuario);

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

      let usuario = req.body as Usuario;

      erro = await Usuario.alterar(usuario);

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
          erro = await Usuario.excluir(id);
      }
      if(erro){
          res.status(400).json(erro);
      }else{
          res.json(true);
      }
  }
}

export = UsuarioApiRoute;