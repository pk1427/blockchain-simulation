# Blockchain Simulation

This is a basic blockchain simulation built with JavaScript. It demonstrates the concept of a blockchain, including block creation, mining, and validation. The project allows for adding blocks to the chain, mining them with proof of work, and verifying the integrity of the entire blockchain.

## Features

- **Block Creation**: Blocks contain transaction data, a timestamp, a unique hash, and a reference to the previous block's hash.
- **Mining**: Each block is mined with a difficulty level to ensure proof of work (the hash must start with a certain number of zeros).
- **Blockchain Validation**: The blockchain can be validated to ensure that all blocks are linked properly and that no blocks have been tampered with.
- **Genesis Block**: The first block in the blockchain is the "genesis block," which is created manually and does not have any predecessor.

## Installation

To get started with this project, you need Node.js installed on your machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blockchain-simulation.git
   cd blockchain-simulation
   ```

2. Install dependencies:

   The project uses the `crypto-js` library for hashing.

   ```bash
   npm install crypto-js
   ```

## Usage

1. **Running the Blockchain**

   To run the blockchain simulation, simply execute the `blockchain.js` file:

   ```bash
   node blockchain.js
   ```

   This will simulate the mining of a few blocks and validate the blockchain.

2. **Tampering with the Blockchain**

   You can experiment with tampering the blockchain. For example, change the transaction data or the block hash and see how the blockchain responds to the changes.

   Example:

   ```bash
   node tamper.js
   ```

   This will simulate a tampered block and demonstrate how the blockchain integrity is compromised.

## Code Explanation

### Block Class

The `Block` class represents a single block in the blockchain. It includes the following properties:

- `index`: The block's index in the chain.
- `timestamp`: The time when the block was created.
- `transactions`: The transactions included in the block.
- `previousHash`: The hash of the previous block.
- `hash`: The current block's hash (calculated using SHA-256).
- `nonce`: The number used to mine the block (in proof of work).

The `mineBlock` method mines a block by iterating until the block's hash matches the difficulty level (a string of leading zeros).

### Blockchain Class

The `Blockchain` class manages the entire blockchain. It includes the following methods:

- `createGenesisBlock`: Creates the first block in the chain.
- `addBlock`: Adds a new block to the chain after mining.
- `isChainValid`: Validates the entire blockchain by checking the integrity of each block and its link to the previous block.

## Example

Here's an example of how the blockchain works:

```javascript
let myCoin = new Blockchain();
console.log("Mining block 1...");
myCoin.addBlock(new Block(1, Date.now(), [{ sender: "Alice", receiver: "Bob", amount: 50 }]));
console.log("Mining block 2...");
myCoin.addBlock(new Block(2, Date.now(), [{ sender: "Bob", receiver: "Charlie", amount: 20 }]));

console.log("Is blockchain valid? " + myCoin.isChainValid());
```

## Contributing

Feel free to fork this project and submit issues or pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Key sections:
- **Features**: Lists out the key functionalities.
- **Installation**: Steps for setting up the project on your machine.
- **Usage**: Explains how to run the project and test the blockchain.
- **Code Explanation**: Describes the main classes (`Block` and `Blockchain`) and their methods.
- **Example**: Provides a basic example of how the blockchain works.
- **Contributing**: Invites others to contribute to the project.
- **License**: Information about the project's license.
