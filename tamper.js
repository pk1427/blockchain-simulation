const { Blockchain, Block } = require("./blockchain.js");  // Import Blockchain and Block

// Example of usage
let myCoin = new Blockchain();
console.log("Mining block 1...");
myCoin.addBlock(
  new Block(1, Date.now(), [{ sender: "Alice", receiver: "Bob", amount: 50 }])
);
console.log("Mining block 2...");
myCoin.addBlock(
  new Block(2, Date.now(), [{ sender: "Bob", receiver: "Charlie", amount: 20 }])
);
console.log("Blockchain: ", JSON.stringify(myCoin, null, 4));

console.log("Is blockchain valid? " + myCoin.isChainValid());

// Tampering simulation
let tamperedBlockchain = new Blockchain();
console.log("Mining block 1...");
tamperedBlockchain.addBlock(
  new Block(1, Date.now(), [{ sender: "Alice", receiver: "Bob", amount: 50 }])
);
tamperedBlockchain.chain[1].transactions[0].sender = "Hacker"; // Tampering with transaction

console.log(
  "Tampered Blockchain: ",
  JSON.stringify(tamperedBlockchain, null, 4)
);

console.log(
  "Is tampered blockchain valid? " + tamperedBlockchain.isChainValid()
);
