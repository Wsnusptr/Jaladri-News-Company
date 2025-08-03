'use client';

import { PopupAd } from './PopupAd';

export function ClientPopupWrapper(): JSX.Element {
  return <PopupAd 
    delayMs={1000} 
    autoClose={15000} 
    repeatInterval={300000} 
  />;
}