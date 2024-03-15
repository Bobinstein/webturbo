"use client";

import React, { useState, useEffect } from "react";

import { ArconnectSigner } from "arbundles/web";
import { TurboFactory } from "@ardrive/turbo-sdk/web";

import { USD } from "@ardrive/turbo-sdk/web";


export default function Home() {
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);
  const [turbo, setTurbo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


  useEffect(() => {
    console.log('Address updated:', address);
}, [address]);



  //function to generate checkout url
  const getURL = async () => {

    if(turbo && address){
      const {url} = await turbo.createCheckoutSession({
        amount: USD(80),
        owner: address,
        promoCodes: ["WELCOME20"]
      })
      console.log(url)
      return url
    }
  }
  

  // sets state when file is uploaded
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !turbo) return;
  

    const dataItemOpts = {tags: [{name: "test", value: "tag"}]} 
    try {
      console.log("Uploading file:", selectedFile.name);

      const uploadResult = await turbo
      .uploadFile({
        fileStreamFactory: () => selectedFile.stream(),
        fileSizeFactory: () => selectedFile.size,
        dataItemOpts
      })
  
      console.log(uploadResult);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  
  
  

  const handleConnectClick = async () => {
    await window.arweaveWallet.connect(["ACCESS_PUBLIC_KEY", "SIGNATURE", 'ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
    const walletAddress = await window.arweaveWallet.getActiveAddress();
    setAddress(walletAddress);

    if (walletAddress) {
      const arConnectSigner = new ArconnectSigner(window.arweaveWallet);
      setSigner(arConnectSigner);

      const TurboInstance = await TurboFactory.authenticated({ signer: arConnectSigner });
      setTurbo(TurboInstance);
    }
  };

  return (
    <div>
      <main>
        <h1>Welcome to Your Next.js App</h1>
        <button onClick={handleConnectClick}>Connect to ArConnect</button>
        {address && <p>Connected to ArConnect - Address: {address}</p>}
        {signer && <p>ArConnect Signer Initialized</p>}
        {turbo && <p>Turbo Initialized</p>}
        {turbo && <button onClick={getURL}>Get checkout URL</button>}

        {/* File Upload Section */}
        {turbo && (
          <div>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && (
              <button onClick={handleFileUpload}>Upload File</button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
