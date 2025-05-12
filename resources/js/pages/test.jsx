// useShop.js (custom hook to get shop name)
import { useEffect, useState } from 'react';

export function useShop() {
  const [shop, setShop] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shopParam = params.get('shop');
    if (shopParam) {
      setShop(shopParam);
    }
  }, []);

  return (<h1>{shop}</h1>);
}


export default useShop;