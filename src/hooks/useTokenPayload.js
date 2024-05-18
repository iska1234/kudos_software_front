import { useState, useEffect } from 'react';

const useTokenPayload = () => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      const tokenParts = sessionToken.split('.');
      if (tokenParts.length === 3) {
        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);
        const parsedPayload = JSON.parse(decodedPayload);

        if (parsedPayload.userId) {
          setUserId(parsedPayload.userId);
        }

        if (parsedPayload.role) {
          setRole(parsedPayload.role);
        }
      } else {
        console.error('El token no tiene el formato correcto.');
      }
    } else {
      console.error('No se encontró ningún token en el localStorage.');
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  return { userId, role };
};

export default useTokenPayload;
