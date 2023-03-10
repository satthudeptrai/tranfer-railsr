const axios = require('axios');
const LedgersModel = require('../models/ledgersModel');
class LedgerController {
  tranferData = async () => {
    try {
      const items_per_page = 100;
      let page_card = 0;
      for( ; ; ) {
        const { data: arrayData } = await axios({
          method: 'get',
          url: '/customer/ledgers',
          params: {
            items_per_page: items_per_page,
            offset: page_card * items_per_page,
            // from_date: process.argv[3] || "2019-01-01"
          }
        });
        LedgersModel.create(arrayData);
        if (arrayData.length <= 0) {
          console.log("tranfer ledger done")
          break;
        }
        page_card ++;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new LedgerController;