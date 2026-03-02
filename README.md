# Nigeria Electoral Transparency Demo

## Project Overview

This project is a blockchain-based polling system built to provide transparency and accountability in elections. It records election results on the Ethereum blockchain (local Hardhat network) and allows live monitoring through a React.js frontend.

Key features:
- Records election results (votes per polling unit and party) on-chain.
- Only an authorized officer can submit results.
- Live results table for real-time monitoring.
- Built with Solidity smart contracts and React.js frontend.
- Uses MetaMask to interact with the local blockchain, but can also be deployed and hosted on a live network such as Ethereum Mainnet or a testnet (e.g., Goerli, Sepolia) by updating the network configuration in Hardhat and connecting MetaMask to the chosen network.

### Problem it Solves
- Prevents tampering with election results.
- Provides real-time visibility of votes.
- Creates an immutable audit trail for results.

---

## Backend - Smart Contracts

### Smart Contract: `ElectionResults.sol`

Written in Solidity ^0.8.20, the contract includes:
- `officer`: authorized account to submit results.
- `Result` struct: stores `pollingUnit`, `party`, `votes`, `timestamp`.
- `results` array: stores all submitted results.

**Functions:**
1. `submitResult(string _pollingUnit, string _party, uint _votes)`
   - Adds a result to the array.
   - Only callable by the officer (`modifier onlyOfficer`).
   - Emits `ResultSubmitted` event.

2. `getResults() public view returns (Result[] memory)`
   - Returns all results stored on-chain.

### Deployment

Using Hardhat and a deployment script `scripts/deploy.js`:

```bash
# Start local blockchain
npx hardhat node

# In a new terminal, deploy the contract
npx hardhat run scripts/deploy.js --network localhost
```

The first account in Hardhat is set as the `officer` by default.

### Hardhat Node Accounts
- Hardhat provides 20 pre-funded accounts (10,000 ETH each).
- The officer account must be imported into MetaMask to submit results.

---

## Frontend - React Application

### Features
- Connects to MetaMask.
- Allows officer to submit election results.
- Displays live results table.
- Interacts with the smart contract using ethers.js.

### How it Works
1. Connect wallet: Officer connects MetaMask to local Hardhat network.
2. Submit results: Fill in polling unit, party, votes → calls `submitResult`.
3. View results: Frontend reads `getResults()` and displays table.

### Running Frontend
```bash
cd frontend
npm install
npm start
```
- Make sure MetaMask is connected to `http://localhost:8545`.
- Import the officer account private key from Hardhat.

---

## Full Project Start Instructions

1. **Start Hardhat node:**
```bash
npx hardhat node
```

2. **Deploy the smart contract:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```
- Copy the contract address to frontend config if needed.

3. **Connect MetaMask:**
- Network: `http://127.0.0.1:8545`
- Import the officer account private key.

4. **Run the frontend:**
```bash
cd frontend
npm install
npm start
```

The app should allow result submissions (only by the officer) and display live results.

---

## How the Project Works

| Feature | How it Works | Problem Solved |
|---------|-------------|----------------|
| Submit Result | Officer inputs polling unit, party, votes → smart contract stores result | Prevents unauthorized submissions, ensures data integrity |
| Live Results | Frontend calls `getResults()` → updates table | Provides transparency in real-time |
| Immutable Records | Data stored on blockchain | Prevents tampering or deleting results |
| Authorized Access | `onlyOfficer` modifier | Ensures only the officer can submit results |

**Flow:**
1. Officer opens React app → connects MetaMask → Hardhat local network.
2. Officer submits polling data → stored on blockchain → emits event.
3. React app reads results → updates table in real-time.
4. Users can view results → auditability.

---

## Benefits
- **Transparency**: Everyone can verify votes.
- **Security**: Votes are immutable on blockchain.
- **Accountability**: Only authorized officer can submit results.
- **Real-time updates**: Frontend shows live vote counts.
- **Audit trail**: Each result has a timestamp and polling unit.

---

## Recommendations / Next Steps
1. Support multiple officers or admin management.
2. Add vote validation (e.g., max votes per polling unit).
3. Filter/search live results per polling unit.
4. Deploy to a testnet (Goerli) for broader testing.
5. Integrate event listeners for automatic frontend updates when new results are submitted.

---

## Summary
This project is fully functional locally:
- Smart contract securely stores results.
- Frontend interacts with blockchain via MetaMask.
- Submission, live results, and authorization all work.
- Officer account is required to submit results.

All components are designed to ensure **transparent, secure, and auditable election results**.

