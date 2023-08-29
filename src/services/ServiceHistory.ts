import axios from "axios";
import { HistoryBTC } from "../entities/HistoryBTC";
import { AppDataSource } from "../configuration/connection";

export class ServiceHistory {
  async Gethistory(time_start, limit) {    
       
    const response = await axios.get(
      `https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?period_id=1DAY&limit=${limit}&time_start=${time_start}`,
      {
        headers: {
          "X-CoinAPI-Key": "C010078B-6F19-4559-87FB-28DFE0682724",
        },
      }
    );

    const historyRepository = AppDataSource.getRepository(HistoryBTC); 
    const total = response.data.length;
    let count = 0;
    for (const apiData of response.data) {
      count++      
      const timeOpenUTC = new Date(apiData.time_open).toISOString();
      const timeCloseUTC = new Date(apiData.time_close).toISOString();

      const existingRecord = await historyRepository.findOne({
        where: {
          time_open: new Date(timeOpenUTC),
          time_close: new Date(timeCloseUTC),
        },
      });
    
      if (existingRecord) {
        console.log("record already exists:", existingRecord);
        continue;
      }

      const historyBTC = new HistoryBTC();
      historyBTC.price_high = apiData.price_high;
      historyBTC.price_low = apiData.price_low;
      historyBTC.price_open = apiData.price_open;
      historyBTC.price_close = apiData.price_close;
      historyBTC.time_open = new Date(timeOpenUTC);
      historyBTC.time_close = new Date(timeCloseUTC);

      await historyRepository.save(historyBTC);

      if (total == count && historyBTC.time_open.toLocaleDateString() != new Date().toLocaleDateString()) {
        const currentDate = new Date();
        const timeDifferenceInMilliseconds = currentDate.getTime() - new Date(timeOpenUTC).getTime();
        const daysDifference = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24);
  
        const newTimeStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - daysDifference, 0, 0, 0).toISOString().replace('.000Z','');       
        await this.Gethistory(newTimeStart, 10000); // Chama a função recursivamente com o novo ponto de partida
      }
    }    
  }
}
