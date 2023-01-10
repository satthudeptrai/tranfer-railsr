const { connect, disconnect } = require('./config/db/index');
const setup = require('./config/request');
const EndusersController = require('./controllers/endusers');
const BeneficiariesController = require('./controllers/beneficiaries');
const CardController = require('./controllers/cards');
const LedgerController = require('./controllers/ledgers');
const TransactionsController = require('./controllers/transactions');
const traferData = async () => {
  await setup();
  await connect();
  const tranferEnduser = EndusersController.tranferData();
  const tranferBeneficiarie = BeneficiariesController.tranferData();
  const tranferCard = CardController.tranferData();
  const tranferLedger = LedgerController.tranferData();
  const tranferTransaction = TransactionsController.tranferData();
  await tranferEnduser;
  await tranferBeneficiarie;
  await tranferCard;
  await tranferLedger;
  await tranferTransaction;
  await disconnect();
};
// traferData();
console.log("arguments", process.argv)