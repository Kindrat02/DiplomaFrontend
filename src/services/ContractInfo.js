const contractAddress = "0x64561ac5Fce9bb8cac2f911a27bfaB4B05Cf8cf6";

const ABI = [{
		"inputs": [{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "_client",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "_driver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pledge",
				"type": "uint256"
			}
		],
		"name": "addBooking",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fund",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "string",
			"name": "_id",
			"type": "string"
		}],
		"name": "proceedPayment",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "string",
			"name": "_id",
			"type": "string"
		}],
		"name": "returnPledgeToClient",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "string",
			"name": "_id",
			"type": "string"
		}],
		"name": "returnPledgeToDriver",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "address payable",
			"name": "_feeWallet",
			"type": "address"
		}],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "feePercent",
		"outputs": [{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "feeWallet",
		"outputs": [{
			"internalType": "address payable",
			"name": "",
			"type": "address"
		}],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [{
			"internalType": "string",
			"name": "_id",
			"type": "string"
		}],
		"name": "getBooking",
		"outputs": [{
			"components": [{
					"internalType": "address payable",
					"name": "clientAddress",
					"type": "address"
				},
				{
					"internalType": "address payable",
					"name": "driverAddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "pledge",
					"type": "uint256"
				},
				{
					"internalType": "enum DriverFleet.BookingState",
					"name": "state",
					"type": "uint8"
				}
			],
			"internalType": "struct DriverFleet.Booking",
			"name": "",
			"type": "tuple"
		}],
		"stateMutability": "view",
		"type": "function"
	}
];

export {
	ABI,
	contractAddress
};