const { Blockchain, Block } = require("./blockchain.js");  

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
.23
