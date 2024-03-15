export const connectToArConnect = async () => {
    if (typeof window === 'undefined' || !window.arweaveWallet) {
      console.log("ArConnect is not available");
      return null;
    }
  
    try {
      await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
      const address = await window.arweaveWallet.getActiveAddress();
      return address;
    } catch (error) {
      console.error('Error connecting to ArConnect:', error);
      return null;
    }
  };
  