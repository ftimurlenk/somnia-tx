# Sequential Contract Interaction Tool for Somnia ✨

This is a web application designed to sequentially interact with a predefined list of smart contracts on a specified blockchain network. It allows a user to connect their wallet and automatically execute transactions with all contracts in the list by clicking a single button.

This tool is particularly useful for scenarios that require generating on-chain activity on testnets, preparing for airdrop events, or any use case that involves regular interaction with a specific list of contracts.

**[View Live Demo](https://somnia-tx.vercel.app/)** 👈 *(Update this link after deploying to Vercel)*

---

## 🚀 Key Features

* **Broad Wallet Support:** Powered by [RainbowKit](https://www.rainbowkit.com/), it's compatible with all major browser wallets like MetaMask, Rabby, Coinbase Wallet, etc., through the EIP-6963 standard.
* **Custom Network Configuration:** Configured to run on a specific EVM-compatible network (defaults to **Somnia Shannon Testnet**).
* **Sequential & Automated Interaction:** Interacts with a hardcoded list of smart contracts sequentially with a single button click.
* **Real-Time Transaction Logging:** Displays the status of each transaction (sent, pending confirmation, success, error) in the UI.
* **Modern Tech Stack:** Built with Next.js, React, wagmi, and TypeScript.
* **Seamless Deployment:** Ready for instant deployment on Vercel.

---

## 🔧 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (React)
* **Wallet Connection:** [RainbowKit](https://www.rainbowkit.com/)
* **Blockchain Interaction:** [wagmi](https://wagmi.sh/) & [viem](https://viem.sh/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Deployment:** [Vercel](https://vercel.com/)


## 📖 Usage

1.  Open the application in your browser.
2.  Click the **"Connect Wallet"** button to connect your wallet.
3.  Make sure your wallet is on the correct network (**Somnia Shannon Testnet**). RainbowKit will prompt you to switch networks if necessary.
4.  Click the **"Start Interaction with X Fixed Contracts"** button.
5.  The application will sequentially request transaction approvals from your wallet for each contract in the list.
6.  You can monitor the process and results in the **"Transaction Log"** section.

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
