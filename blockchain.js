const crypto = require("crypto");
const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, transactions, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  }
}

class Blockchain {
  constructor(difficulty = 2) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.chain[this.chain.length - 1].hash;
    newBlock.index = this.chain.length;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Check the current block's hash against its calculated hash
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log(`Block ${i} has been tampered with!`);
        return false;
      }

      // Check if the current block's previousHash is correct
      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log(`Block ${i} has an invalid previousHash link!`);
        return false;
      }
    }
    return true;
  }
}
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

module.exports = { Blockchain, Block };
