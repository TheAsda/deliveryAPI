const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const clear = () => {
  client.indices.delete({
    index: '_all'
  });
};

const log = (type, msg) => {
  client.index({
    index: type,
    body: {
      msg: msg,
      insertion: new Date(Date.now()).toDateString()
    }
  });
};

const getPaidByDate = date => {
  return new Promise((res, rej) => {
    const str = new Date(date).toDateString();
    client
      .search({
        index: 'payment',
        body: { query: { match: { insertion: str } } }
      })
      .then(({ body }) => {
        res(body.hits.hits);
      });
  });
};

module.exports = {
  log,
  getPaidByDate
};
