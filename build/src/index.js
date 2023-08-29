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
const ServiceHistory_1 = require("./services/ServiceHistory");
const connection_1 = require("./configuration/connection");
const node_cron_1 = __importDefault(require("node-cron"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            node_cron_1.default.schedule('0 10 * * *', () => __awaiter(this, void 0, void 0, function* () {
                console.log("Tarefa agendada sendo executada às 10h da manhã");
                yield (0, connection_1.createConnection)();
                const service = new ServiceHistory_1.ServiceHistory();
                const currentDate = new Date();
                const time_start = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate(), 0, 0, 0).toISOString().replace(".000Z", "");
                yield service.Gethistory(time_start, 10000);
                console.log("Historic BIT successfully saved in the database!");
            }));
        }
        catch (e) {
            console.log(e);
        }
    });
}
main();
//# sourceMappingURL=index.js.map