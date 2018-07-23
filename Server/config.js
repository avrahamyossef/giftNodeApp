module.exports = {
    // 1. MongoDB
    MONGO_URI: "mongodb://giftmongoddb-shard-00-00-mpcwb.mongodb.net:27017,giftmongoddb-shard-00-01-mpcwb.mongodb.net:27017,giftmongoddb-shard-00-02-mpcwb.mongodb.net:27017/test?replicaSet=GiftMongodDb-shard-0 --ssl --authenticationDatabase admin --username avrahamyossef3 --password <Ay748596>",

    // 2. JWT
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',

    // 3. Express Server Port
    LISTEN_PORT: process.env.LISTEN_PORT || 3000
};