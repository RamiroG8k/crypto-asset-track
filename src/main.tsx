import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThirdwebProvider } from 'thirdweb/react';

import AssetsProvider from './providers/AssetsProvider/AssetsProvider.tsx';
import App from './App.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThirdwebProvider>
            <AssetsProvider>
                <App />
            </AssetsProvider>
        </ThirdwebProvider>
    </StrictMode>,
)
