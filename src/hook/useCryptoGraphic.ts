import React from "react";

export const useCryptoGraphic = () => {
  var CryptoJS = require("crypto-js");

  const enCode = (data: any) => {
    const jsonString = JSON.stringify(data);
    // Encrypt the JSON string
    const encryptedString = CryptoJS.AES.encrypt(
      jsonString,
      "encryptionKey"
    ).toString();
    // Encode the encrypted string
    const encodedString = btoa(encryptedString);
    return encodedString;
  };

  const deCode = (encodedString: string) => {
    const decodedString = atob(encodedString);

    // Decrypt the decoded string
    const decryptedString = CryptoJS.AES.decrypt(
      decodedString,
      "encryptionKey"
    ).toString(CryptoJS.enc.Utf8);

    // Parse the decrypted string as a JSON object
    const data = JSON.parse(decryptedString);
    return data ;
  };

  return {
    enCode,
    deCode,
  };
  
};
