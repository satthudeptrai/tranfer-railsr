const axios = require('axios');
const CardModel = require('../models/cardModel');
const CardRuleModel = require('../models/cardRuleModel');
class CardController {
  tranferData = async () => {
    try {
      const items_per_page = 100;
      let page_card = 0;
      let last_seen_id = null
      for( ; ; ) {
        const { data: arrayData } = await axios({
          method: 'get',
          url: '/customer/cards',
          params: {
            items_per_page: items_per_page,
            offset: page_card * items_per_page,
            // from_date: process.argv[3] || "2019-01-01"
          }
        });
        CardModel.create(arrayData);
        if (arrayData.length <= 0) {
          console.log("tranfer card done")
          break;
        }
        page_card ++;
      }
      for( ; ; ) {
        const { data: arrayData } = await axios({
          method: 'get',
          url: '/customer/cards/rules',
          params: !last_seen_id ? {
            items_per_page: items_per_page,
            // from_date: process.argv[3] || "2019-01-01"
          }
          : {
            items_per_page: items_per_page,
            last_seen_id: last_seen_id,
            // from_date: process.argv[3] || "2019-01-01"
          }
        });
        CardRuleModel.create(arrayData);
        if (arrayData.length <= 0) {
          console.log("tranfer card rule done")
          break;
        }
        last_seen_id = arrayData[arrayData.length - 1]?.card_rule_id;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new CardController;