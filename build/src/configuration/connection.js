"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const HistoryBTC_1 = require("../entities/HistoryBTC");
const ormconfig_1 = __importDefault(require("../../ormconfig"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "oracle",
    host: ormconfig_1.default.host,
    port: ormconfig_1.default.port,
    username: ormconfig_1.default.username,
    password: ormconfig_1.default.password,
    connectString: ormconfig_1.default.connectString,
    database: ormconfig_1.default.database,
    synchronize: true,
    logging: false,
    entities: [HistoryBTC_1.HistoryBTC],
});
function createConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.AppDataSource.initialize()
            .then(() => {
            console.log("Data Source has been initialized!");
        })
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    });
}
exports.createConnection = createConnection;
//# sourceMappingURL=connection.js.map