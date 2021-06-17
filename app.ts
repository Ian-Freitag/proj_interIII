import app = require("teem");
import appsettings = require("./appsettings");
import WebSocket = require("ws");
import Ponto = require("./models/ponto");

interface Cliente {
	id: number;
	apelido: string;
	ws: WebSocket;
}

const pontos: Ponto[] = [];

const clientes: Cliente[] = [];
let contadorCliente = 0;

function clienteConectado(ws: WebSocket) {
	contadorCliente++;

	const cliente = {
		id: contadorCliente,
		apelido: "Cliente " + contadorCliente,
		ws: ws
	};

	clientes.push(cliente);

	console.log("Novo cliente conectado com id: " + cliente.id);

	ws.on("message", function (json) { clienteEnviouJson(cliente, json as string) });
	ws.on("close", function () { clienteDesconectado(cliente) });
}

function repassarParaOsDemaisClientes(cliente: Cliente, obj: any) {
	var json = JSON.stringify(obj);

	for (var i = 0; i < clientes.length; i++) {
		if (clientes[i] != cliente) {
			clientes[i].ws.send(json);
		}
	}
}

function clienteEnviouJson(cliente: Cliente, json: string) {
	const obj = JSON.parse(json);

	switch (obj.comando) {
		case "criarPonto":
			pontos.push(obj.ponto);

			repassarParaOsDemaisClientes(cliente, {
				comando: "criarPonto",
				ponto: obj.ponto
			});
			break;

		case "listarPontos":
			cliente.ws.send(JSON.stringify({
				comando: "listarPontos",
				pontos: pontos
			}));	
			break;
	}
}

function clienteDesconectado(cliente: Cliente) {
	// Descobre qual era a posição do cliente no array clientes, e remove ele de lá
	for (var i = 0; i < clientes.length; i++) {
		if (clientes[i] == cliente) {
			console.log("Cliente desconectado com id: " + cliente.id);
			clientes.splice(i, 1);
			break;
		}
	}
}

const wss = new WebSocket.Server({
	port: 8181
});

wss.on("connection", clienteConectado);

app.run({
	sqlConfig: appsettings.sqlPool
});
