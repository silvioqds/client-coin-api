import { ServiceHistory } from "./services/ServiceHistory";
import { createConnection } from "./configuration/connection";
import cron from "node-cron";

async function main() {
  try {
    cron.schedule('0 10 * * *', async () => {
      console.log("Tarefa agendada sendo executada às 10h da manhã");

      await createConnection();
      const service = new ServiceHistory();

      const currentDate = new Date();
      const time_start = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate(), 0, 0, 0).toISOString().replace(".000Z", "");
      await service.Gethistory(time_start, 10000);

      console.log("Historic BIT successfully saved in the database!");
    });
  } catch (e) {
    console.log(e);
  }
}

main();
