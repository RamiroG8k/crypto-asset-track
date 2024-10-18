import type { Asset, AssetData } from "../../api/AssetsAPI/types";

export type AssetsContextProps = {
    assets: Asset[];
    loadAssetData: (assetId: Asset['id'], days?: 7 | 30 | 365) => Promise<AssetData>;
};
