const { connect, disconnect } = require('./config/db/index');
const setup = require('./config/request');
const EndusersController = require('./controllers/endusers');
const BeneficiariesController = require('./controllers/beneficiaries');
const CardController = require('./controllers/cards');
const LedgerController = require('./controllers/ledgers');
const TransactionsController = require('./controllers/transactions');

const traferData = async () => {
  const d = new Date();
  const thisMonth = d.getMonth();
  const thisYear = d.getFullYear();
  const listDate = [];
  for(let y = 2019; y <= thisYear; y++) {
    if(y === thisYear) {
      for(let m = 0; m <= thisMonth; m++) {
        const firstDate = new Date(y, m, 1);
        const lastDate = new Date(y, m + 1, 0);
        listDate.push({
          firstDate: `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()}T00:00:00.000Z`,
          lastDate: `${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-10T23:59:59.999Z`
        });
        listDate.push({
          firstDate: `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-10T00:00:00.000Z`,
          lastDate: `${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-20T23:59:59.999Z`
        });
        listDate.push({
          firstDate: `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-20T00:00:00.000Z`,
          lastDate: `${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-${lastDate.getDate()}T23:59:59.999Z`
        });
      }
    } else {
      for(let m = 0; m <= 11; m++) {
        const firstDate = new Date(y, m, 1);
        const lastDate = new Date(y, m + 1, 0);
        listDate.push({
          firstDate: `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()}T00:00:00.000Z`,
          lastDate: `${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-10T23:59:59.999Z`
        });
        listDate.push({
          firstDate: `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-10T00:00:00.000Z`,
          lastDate: `${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-20T23:59:59.999Z`
        });
        listDate.push({
          firstDate: `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-20T00:00:00.000Z`,
          lastDate: `${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-${lastDate.getDate()}T23:59:59.999Z`
        });
      }
    }
  }
  await setup();
  await connect();
  const tranferEnduser = EndusersController.tranferData();
  const tranferBeneficiarie = BeneficiariesController.tranferData();
  const tranferCard = CardController.tranferData();
  const tranferLedger = LedgerController.tranferData();
  const listTransaction = listDate.map(item => {
    return TransactionsController.tranferData(item.firstDate, item.lastDate);
  });
  const listTranferTransaction = Promise.all(listTransaction);
  await tranferEnduser;
  await tranferBeneficiarie;
  await tranferCard;
  await tranferLedger;
  await listTranferTransaction;
  await disconnect();
};

traferData();