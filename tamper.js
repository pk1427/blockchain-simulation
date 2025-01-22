const Blockchain = require("./blockchain");

// Tamper with the blockchain
const tamperedBlockchain = new Blockchain();

console.log("Mining block 1...");
tamperedBlockchain.addBlock(tamperedBlockchain.createGenesisBlock()); 

tamperedBlockchain.chain[1].transactions = [{ sender: "Hacker", receiver: "Bob", amount: 100 }];
tamperedBlockchain.chain[1].hash = tamperedBlockchain.chain[1].calculateHash();

console.log("Tampered Blockchain:");
console.log(JSON.stringify(tamperedBlockchain, null, 2));

console.log("Is tampered blockchain valid? ", tamperedBlockchain.isChainValid());
