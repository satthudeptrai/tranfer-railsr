const axios = require('axios');
const TransactionsModel = require('../models/transactionsModel');
class TransactionsController {
  tranferData = async (firstDate, lastDate) => {
    try {
      console.log(`tranfer transaction ${firstDate} start`)
      const items_per_page = 100;
      let page = 0;
      for( ; ; ) {
        const { data: arrayData } = await axios({
          method: 'get',
          url: '/customer/transactions',
          params: {
            items_per_page: items_per_page,
            offset: page * items_per_page,
            // from_date: process.argv[3] || "2019-01-01"
            from_date: `${firstDate}`,
            to_date: `${lastDate}`,
          }
        });
        TransactionsModel.create(arrayData);
        if (arrayData.length <= 0) {
          console.log(`tranfer transaction ${firstDate} done`)
          console.log(`page ${page}`)
          break;
        }
        page ++;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = new TransactionsController;