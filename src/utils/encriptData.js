import CryptoJS from 'crypto-js';

// Función para encriptar los datos antes de almacenarlos en localStorage
export const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret_key').toString();
    return encryptedData;
};

// Función para desencriptar los datos cuando se recuperan del localStorage
export const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret_key');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
};
