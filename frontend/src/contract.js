export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //contract address

export const CONTRACT_ABI =   [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "pollingUnit",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "party",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "votes",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "ResultSubmitted",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getResults",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "pollingUnit",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "party",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "votes",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct ElectionResults.Result[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "officer",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "results",
      "outputs": [
        {
          "internalType": "string",
          "name": "pollingUnit",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "party",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "votes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_pollingUnit",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_party",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_votes",
          "type": "uint256"
        }
      ],
      "name": "submitResult",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];