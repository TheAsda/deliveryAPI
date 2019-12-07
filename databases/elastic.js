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

/*async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const { body } = await client.search({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { quote: 'winter' }
      }
    }
  })

  console.log(body.hits.hits)
}

run().catch(console.log)*/
