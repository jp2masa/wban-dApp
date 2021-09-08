const BSC_MAINNET: Network = {
	network: 'bsc',
	chainId: '0x38',
	chainName: 'Binance Smart Chain',
	chainUrl: 'https://www.binance.org/en/smartChain',
	nativeCurrency: {
		name: 'BNB',
		symbol: 'BNB',
		decimals: 18
	},
	minimumNeededForWrap: 0.0006,
	rpcUrls: [
		'https://bsc-dataseed.binance.org/',
		'https://bsc-dataseed1.defibit.io/',
		'https://bsc-dataseed1.ninicoin.io/'
	],
	blockExplorerUrls: ['https://www.bscscan.com']
}

const BSC_TESTNET: Network = {
	network: 'bsc',
	chainId: '0x61',
	chainName: 'Binance Smart Chain Testnet',
	chainUrl: 'https://www.binance.org/en/smartChain',
	nativeCurrency: {
		name: 'BNB',
		symbol: 'BNB',
		decimals: 18
	},
	minimumNeededForWrap: 0.0006,
	rpcUrls: [
		'https://data-seed-prebsc-1-s1.binance.org:8545/',
		'https://data-seed-prebsc-2-s1.binance.org:8545/',
		'https://data-seed-prebsc-1-s2.binance.org:8545/'
	],
	blockExplorerUrls: ['https://testnet.bscscan.com']
}

const POLYGON_MAINNET: Network = {
	network: 'polygon',
	chainId: '0x89',
	chainName: 'Polygon',
	chainUrl: 'https://polygon.technology',
	nativeCurrency: {
		name: 'MATIC',
		symbol: 'MATIC',
		decimals: 18
	},
	minimumNeededForWrap: 0.004,
	rpcUrls: ['https://rpc-mainnet.matic.network'],
	blockExplorerUrls: ['https://explorer.matic.network/']
}

const POLYGON_TESTNET: Network = {
	network: 'polygon',
	chainId: '0x13881',
	chainName: 'Polygon Testnet',
	chainUrl: 'https://polygon.technology',
	nativeCurrency: {
		name: 'MATIC',
		symbol: 'MATIC',
		decimals: 18
	},
	minimumNeededForWrap: 0.004,
	rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
	blockExplorerUrls: ['https://mumbai.polygonscan.com']
}

class Networks {
	private networks: Map<string, Network>

	static EXPECTED_CHAIN_ID: string = process.env.VUE_APP_EXPECTED_CHAIN_ID || ''

	constructor() {
		this.networks = new Map()
		this.networks.set('0x38', BSC_MAINNET)
		this.networks.set('0x61', BSC_TESTNET)
		this.networks.set('0x89', POLYGON_MAINNET)
		this.networks.set('0x13881', POLYGON_TESTNET)
	}

	public getNetworkData(chainId: string): Network | undefined {
		return this.networks.get(chainId)
	}

	public getExpectedNetworkData(): Network {
		const expectChain = this.getNetworkData(Networks.EXPECTED_CHAIN_ID)
		if (!expectChain) {
			throw new Error('Missing or misconfigured expected blockchain ID')
		} else {
			return expectChain
		}
	}
}

interface Network {
	network: 'bsc' | 'polygon'
	chainId: string
	chainName: string
	chainUrl: string
	nativeCurrency: {
		name: string
		symbol: string // 2-6 characters long
		decimals: 18
	}
	minimumNeededForWrap: number
	rpcUrls: string[]
	blockExplorerUrls: string[]
	iconUrls?: string[] // Currently ignored.
}

export { Networks, Network }
