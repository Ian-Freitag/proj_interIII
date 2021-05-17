"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("teem");
const appsettings = require("./appsettings");
app.run({
    sqlConfig: appsettings.sqlPool
});
//# sourceMappingURL=app.js.map