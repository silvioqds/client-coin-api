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
exports.ServiceHistory = void 0;
const axios_1 = __importDefault(require("axios"));
const HistoryBTC_1 = require("../entities/HistoryBTC");
const connection_1 = require("../configuration/connection");
class ServiceHistory {
    Gethistory(time_start, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?period_id=1DAY&limit=${limit}&time_start=${time_start}`, {
                headers: {
                    "X-CoinAPI-Key": "C010078B-6F19-4559-87FB-28DFE0682724",
                },
            });
            const historyRepository = connection_1.AppDataSource.getRepository(HistoryBTC_1.HistoryBTC);
            const total = response.data.length;
            let count = 0;
            for (const apiData of response.data) {
                count++;
                const timeOpenUTC = new Date(apiData.time_open).toISOString();
                const timeCloseUTC = new Date(apiData.time_close).toISOString();
                const existingRecord = yield historyRepository.findOne({
                    where: {
                        time_open: new Date(timeOpenUTC),
                        time_close: new Date(timeCloseUTC),
                    },
                });
                if (existingRecord) {
                    console.log("record already exists:", existingRecord);
                    continue;
                }
                const historyBTC = new HistoryBTC_1.HistoryBTC();
                historyBTC.price_high = apiData.price_high;
                historyBTC.price_low = apiData.price_low;
                historyBTC.price_open = apiData.price_open;
                historyBTC.price_close = apiData.price_close;
                historyBTC.time_open = new Date(timeOpenUTC);
                historyBTC.time_close = new Date(timeCloseUTC);
                yield historyRepository.save(historyBTC);
                if (total == count && historyBTC.time_open.toLocaleDateString() != new Date().toLocaleDateString()) {
                    const currentDate = new Date();
                    const timeDifferenceInMilliseconds = currentDate.getTime() - new Date(timeOpenUTC).getTime();
                    const daysDifference = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24);
                    const newTimeStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - daysDifference, 0, 0, 0).toISOString().replace('.000Z', '');
                    yield this.Gethistory(newTimeStart, 10000); // Chama a função recursivamente com o novo ponto de partida
                }
            }
        });
    }
}
exports.ServiceHistory = ServiceHistory;
//# sourceMappingURL=ServiceHistory.js.map