const crypto = require("crypto");

// Block class definition (or import if it's in another file)
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
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.transactions) +
          this.nonce
      )
      .digest("hex");
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
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log("Current hash is invalid");
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log("Previous hash is invalid");
        return false;
      }
    }
    return true;
  }
}

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
console.log(JSON.stringify(myCoin, null, 4));

console.log("Is blockchain valid? " + myCoin.isChainValid());

// Now for tampering
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
