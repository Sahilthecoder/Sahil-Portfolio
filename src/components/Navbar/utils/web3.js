// Web3 and Crypto Integration Utilities
// This module provides wallet connection and NFT verification functionality

// Mock implementation - in a real app, you would use libraries like:
// - web3.js or ethers.js for Ethereum
// - @solana/web3.js for Solana
// - @walletconnect/web3-provider for WalletConnect

class Web3Manager {
  constructor() {
    this.connected = false;
    this.accounts = [];
    this.chainId = null;
    this.provider = null;
    this.nftContracts = [];
    this.walletName = null;
    this.network = 'mainnet'; // or 'testnet', 'localhost', etc.
    
    // Initialize Web3 provider if available (e.g., MetaMask)
    this.initializeProvider();
    
    // Listen for account/chain changes
    this.setupEventListeners();
  }
  
  // Initialize the Web3 provider
  initializeProvider() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = window.ethereum;
      this.walletName = this.detectWalletName();
      
      // Check if already connected
      this.checkConnection();
      return true;
    } else if (window.web3) {
      // Legacy web3 browser
      this.provider = window.web3.currentProvider;
      this.walletName = 'legacy';
      this.checkConnection();
      return true;
    }
    
    console.warn('No Web3 provider detected');
    return false;
  }
  
  // Detect the wallet name/type
  detectWalletName() {
    if (!this.provider) return null;
    
    if (this.provider.isMetaMask) return 'MetaMask';
    if (this.provider.isTrust) return 'Trust Wallet';
    if (this.provider.isCoinbaseWallet) return 'Coinbase Wallet';
    if (this.provider.isStatus) return 'Status';
    if (this.provider.isImToken) return 'imToken';
    
    return 'Unknown';
  }
  
  // Check if already connected to a wallet
  async checkConnection() {
    if (!this.provider) return false;
    
    try {
      const accounts = await this.provider.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        this.accounts = accounts;
        this.connected = true;
        this.chainId = await this.provider.request({ method: 'eth_chainId' });
        this.emit('connect', { accounts: this.accounts, chainId: this.chainId });
        return true;
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
    
    return false;
  }
  
  // Connect to the wallet
  async connect() {
    if (!this.provider) {
      throw new Error('No Web3 provider available');
    }
    
    try {
      // Request account access if needed
      const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length > 0) {
        this.accounts = accounts;
        this.connected = true;
        this.chainId = await this.provider.request({ method: 'eth_chainId' });
        
        this.emit('connect', { 
          accounts: this.accounts, 
          chainId: this.chainId,
          wallet: this.walletName
        });
        
        return { success: true, accounts, chainId: this.chainId };
      }
      
      return { success: false, error: 'No accounts found' };
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to connect to wallet' 
      };
    }
  }
  
  // Disconnect from the wallet
  disconnect() {
    this.accounts = [];
    this.connected = false;
    this.chainId = null;
    this.emit('disconnect');
    
    // In a real app, you might need to notify the provider
    // that the user has disconnected
    
    return { success: true };
  }
  
  // Switch to a different network/chain
  async switchChain(chainId) {
    if (!this.provider) {
      throw new Error('No Web3 provider available');
    }
    
    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }],
      });
      
      this.chainId = chainId;
      this.emit('chainChanged', chainId);
      
      return { success: true, chainId };
    } catch (error) {
      console.error('Error switching chain:', error);
      
      // If the chain is not added to the wallet, we can prompt to add it
      if (error.code === 4902) {
        return this.addChain(chainId);
      }
      
      return { success: false, error: error.message };
    }
  }
  
  // Add a new chain to the wallet
  async addChain(chainId) {
    // In a real app, you would provide the chain details
    // This is just a placeholder
    const chainParams = {
      chainId: chainId,
      chainName: 'Custom Network',
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://rpc.example.com'],
      blockExplorerUrls: ['https://explorer.example.com']
    };
    
    try {
      await this.provider.request({
        method: 'wallet_addEthereumChain',
        params: [chainParams],
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error adding chain:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Check if an address owns a specific NFT
  async checkNFTOwnership(contractAddress, tokenId, account = null) {
    if (!this.connected) {
      throw new Error('Not connected to a wallet');
    }
    
    const address = account || this.accounts[0];
    
    try {
      // In a real app, you would use a contract instance to check ownership
      // This is a simplified example
      const balance = await this.provider.request({
        method: 'eth_call',
        params: [{
          to: contractAddress,
          data: this.encodeFunctionCall(
            'balanceOf(address,uint256)',
            [address, tokenId]
          )
        }, 'latest']
      });
      
      const ownsNFT = parseInt(balance, 16) > 0;
      
      if (ownsNFT) {
        this.emit('nftVerified', { 
          contractAddress, 
          tokenId, 
          owner: address 
        });
      }
      
      return { 
        success: true, 
        ownsNFT, 
        contractAddress, 
        tokenId, 
        owner: address 
      };
    } catch (error) {
      console.error('Error checking NFT ownership:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Verify NFT-based credentials
  async verifyCredential(credentialId, requiredNFTs = []) {
    if (!this.connected) {
      throw new Error('Not connected to a wallet');
    }
    
    const results = [];
    const address = this.accounts[0];
    
    try {
      for (const nft of requiredNFTs) {
        const result = await this.checkNFTOwnership(
          nft.contractAddress, 
          nft.tokenId, 
          address
        );
        
        results.push({
          ...nft,
          verified: result.success && result.ownsNFT
        });
      }
      
      const allVerified = results.every(r => r.verified);
      
      if (allVerified) {
        this.emit('credentialVerified', { 
          credentialId, 
          address, 
          timestamp: new Date().toISOString() 
        });
      }
      
      return {
        success: true,
        verified: allVerified,
        credentialId,
        address,
        results
      };
    } catch (error) {
      console.error('Error verifying credential:', error);
      return { 
        success: false, 
        error: error.message,
        credentialId,
        results
      };
    }
  }
  
  // Sign a message (for authentication)
  async signMessage(message) {
    if (!this.connected) {
      throw new Error('Not connected to a wallet');
    }
    
    try {
      const signature = await this.provider.request({
        method: 'personal_sign',
        params: [message, this.accounts[0]],
      });
      
      this.emit('signed', { message, signature });
      
      return { success: true, signature };
    } catch (error) {
      console.error('Error signing message:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Helper function to encode function calls
  encodeFunctionCall(functionSignature, params) {
    // In a real app, you would use web3.js or ethers.js to encode function calls
    // This is a simplified example
    const signatureHash = web3.utils.sha3(functionSignature).substr(0, 10);
    const encodedParams = params
      .map(param => {
        if (typeof param === 'string' && param.startsWith('0x')) {
          return param.substr(2).padStart(64, '0');
        } else if (typeof param === 'number') {
          return param.toString(16).padStart(64, '0');
        } else if (typeof param === 'string') {
          return web3.utils.asciiToHex(param).substr(2).padEnd(64, '0');
        }
        return '';
      })
      .join('');
    
    return `${signatureHash}${encodedParams}`;
  }
  
  // Set up event listeners for provider events
  setupEventListeners() {
    if (!this.provider || !this.provider.on) return;
    
    // Handle accounts changed
    this.provider.on('accountsChanged', (accounts) => {
      this.accounts = accounts || [];
      this.connected = this.accounts.length > 0;
      
      this.emit('accountsChanged', this.accounts);
      
      if (this.accounts.length === 0) {
        this.emit('disconnect');
      }
    });
    
    // Handle chain changed
    this.provider.on('chainChanged', (chainId) => {
      this.chainId = chainId;
      this.emit('chainChanged', chainId);
    });
    
    // Handle disconnect
    this.provider.on('disconnect', (error) => {
      this.connected = false;
      this.accounts = [];
      this.emit('disconnect', error);
    });
  }
  
  // Simple event emitter implementation
  on(event, callback) {
    if (!this._events) this._events = {};
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
    
    // Return a function to remove the listener
    return () => {
      if (!this._events || !this._events[event]) return;
      const index = this._events[event].indexOf(callback);
      if (index !== -1) {
        this._events[event].splice(index, 1);
      }
    };
  }
  
  emit(event, ...args) {
    if (!this._events || !this._events[event]) return;
    this._events[event].forEach(callback => {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in ${event} handler:`, error);
      }
    });
  }
}

// Singleton instance
export const web3Manager = new Web3Manager();

// Helper function to format addresses
export function formatAddress(address, start = 6, end = 4) {
  if (!address) return '';
  return `${address.substring(0, start)}...${address.substring(address.length - end)}`;
}

// Helper function to check if an address is valid
export function isValidAddress(address) {
  if (!address || typeof address !== 'string') return false;
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Initialize Web3 when the page loads
if (typeof window !== 'undefined') {
  // Add a connect button if Web3 is available
  if (window.ethereum || window.web3) {
    const connectButton = document.createElement('button');
    connectButton.textContent = 'Connect Wallet';
    connectButton.style.position = 'fixed';
    connectButton.style.bottom = '70px';
    connectButton.style.right = '20px';
    connectButton.style.zIndex = '10000';
    connectButton.style.padding = '10px 20px';
    connectButton.style.background = 'rgba(99, 102, 241, 0.9)';
    connectButton.style.color = 'white';
    connectButton.style.border = 'none';
    connectButton.style.borderRadius = '20px';
    connectButton.style.cursor = 'pointer';
    connectButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    
    connectButton.addEventListener('click', async () => {
      try {
        const result = await web3Manager.connect();
        if (result.success) {
          connectButton.textContent = `Connected: ${formatAddress(result.accounts[0])}`;
          connectButton.style.background = 'rgba(16, 185, 129, 0.9)';
        } else {
          console.error('Failed to connect:', result.error);
          alert(`Failed to connect: ${result.error}`);
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert(`Error: ${error.message}`);
      }
    });
    
    document.body.appendChild(connectButton);
    
    // Update button if already connected
    web3Manager.on('connect', ({ accounts }) => {
      if (accounts && accounts.length > 0) {
        connectButton.textContent = `Connected: ${formatAddress(accounts[0])}`;
        connectButton.style.background = 'rgba(16, 185, 129, 0.9)';
      }
    });
    
    web3Manager.on('disconnect', () => {
      connectButton.textContent = 'Connect Wallet';
      connectButton.style.background = 'rgba(99, 102, 241, 0.9)';
    });
  }
}
