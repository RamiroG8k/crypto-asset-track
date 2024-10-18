import { createContext, useContext, useEffect, useState } from 'react';
import { AssetsContextProps } from './types';
import { Asset, AssetData } from '../../api/AssetsAPI/types';
import useAPI from '../../api/useAPI';

const AssetsContext = createContext<AssetsContextProps>({} as AssetsContextProps);

const AssetsProvider = ({ children }: { children: React.ReactNode }) => {
    const [assets, setAssets] = useState<Asset[]>([]);

    const { assetsAPI } = useAPI();

    const loadAssetData = async (assetId: string, days: 7 | 30 | 365 = 7) => {
        try {
            let assetData: AssetData;

            const cachedAsset = localStorage.getItem(`asset-${assetId}-${days}`);

            if (cachedAsset) {
                assetData = JSON.parse(cachedAsset) as AssetData;
            } else {
                assetData = await assetsAPI.getHistoricalData(assetId, days);

                localStorage.setItem(`asset-${assetId}-${days}`, JSON.stringify(assetData));
            }

            return assetData;
        } catch (err) {
            console.warn(err);
            throw new Error(`Failed to load chart data for asset ${assetId}`);
        }
    };

    const loadAssets = async () => {
        try {
            let assetsList: Asset[];

            const cachedAssets = localStorage.getItem('assets');

            if (cachedAssets) {
                assetsList = JSON.parse(cachedAssets) as Asset[];
            } else {
                assetsList = await assetsAPI.getCoinsList();

                localStorage.setItem('assets', JSON.stringify(assetsList));
            }

            setAssets(assetsList);

            return assetsList;
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        loadAssets();
    }, []);

    const context = { assets, loadAssetData };

    return (
        <AssetsContext.Provider value={context} >
            {children}
        </AssetsContext.Provider>
    );
};

export const useAssets = () => useContext(AssetsContext);

export default AssetsProvider;
