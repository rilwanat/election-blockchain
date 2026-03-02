import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract";

import ngFlag from "./assets/ng-flag.gif";

function App() {
  const [account, setAccount] = useState(null);
  const [results, setResults] = useState([]);
  const [pollingUnit, setPollingUnit] = useState("");
  const [party, setParty] = useState("");
  const [votes, setVotes] = useState("");

  async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  }

  async function getResults() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider,
    );
    const data = await contract.getResults();
    setResults(data);
  }

  async function submitResult() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer,
    );
    const tx = await contract.submitResult(pollingUnit, party, votes);
    await tx.wait();
    setPollingUnit("");
    setParty("");
    setVotes("");
  }

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider,
      );

      contract.on("ResultSubmitted", () => {
        getResults();
      });

      getResults();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 sm:px-24">
      <div className="mb-8 flex flex-col items-center">
        <img className="w-16  object-cover" src={ngFlag} alt="" />
        <h1 className="text-4xl font-bold text-center mb-2">
          Electoral Transparency Blockchain Demo
        </h1>

        <p className="text-center">
          This project is a blockchain-based polling system built to provide
          transparency and accountability in elections. It records election
          results on the Ethereum blockchain (local Hardhat network) and allows
          live monitoring through a React.js frontend.
        </p>
      </div>
      {!account && (
        <div className="text-center mb-8 ">
          <button
            onClick={connectWallet}
            className="bg-[#F6851B] hover:bg-[#e2761b] px-6 py-2 rounded-lg cursor-pointer"
          >
            Connect Metamask Wallet
          </button>
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded mb-10">
        <h2 className="text-xl mb-4">Submit Result (Officer Only)</h2>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 mb-4">
          <input
            placeholder="Polling Unit"
            value={pollingUnit}
            onChange={(e) => setPollingUnit(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
          />
          <select
            value={party}
            onChange={(e) => setParty(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
          >
            <option value="">Select Party</option>
            <option value="GFP">GFP</option>
            <option value="UPA">UPA</option>
            <option value="PRM">PRM</option>
          </select>
          <input
            placeholder="Votes"
            type="number"
            value={votes}
            onChange={(e) => setVotes(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <button
          onClick={submitResult}
          className="bg-[#008751] hover:bg-[#006b40] px-6 py-2 rounded-lg cursor-pointer"
        >
          Submit
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded mb-10">
        <h2 className="text-xl mb-4">Live Results</h2>
        <table className="w-full bg-gray-800 rounded-lg">
          <thead>
            <tr className="text-left bg-gray-700">
              <th className="p-2 ">Polling Unit</th>
              <th className="p-2">Party</th>
              <th className="p-2">Votes</th>
              <th className="p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} className="text-left border-t border-gray-700 ">
                <td className="p-2">{r.pollingUnit}</td>
                <td className="p-2">{r.party}</td>
                <td className="p-2">{r.votes.toString()}</td>
                <td className="p-2">
                  {new Date(Number(r.timestamp) * 1000).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
