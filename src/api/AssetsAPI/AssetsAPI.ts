import axios from 'axios';
import { AssetData, type Asset } from './types';

class AssetsAPI {
    private readonly client;

    constructor() {
        this.client = axios.create({
            baseURL: 'https://api.coingecko.com/api/v3',
            params: {
                'x_cg_demo_api_key': 'CG-BLuGD7zfTnPR7pZzrcwuPEQm'
            }
        })
    }

    async healthCheck() {
        try {
            await this.client.get('/ping');

            return true;
        } catch (err) {
            console.warn(err);
            throw new Error('HEALTH_CHECK_FAILED');
        }
    }

    async getCoinsList(): Promise<Asset[]> {
        try {
            const { data } = await this.client.get('/coins/markets', {
                params: {
                    category: 'layer-1',
                    include_platform: false,
                    per_page: 10,
                    vs_currency: 'usd'
                }
            });

            return data;
        } catch (err) {
            console.warn(err);
            throw new Error('FAILED_TO_GET_ASSETS');
        }
    }

    async getHistoricalData(assetId: string, days: 7 | 30 | 365): Promise<AssetData> {
        try {
            const { data } = await this.client.get(`/coins/${assetId}/market_chart`, {
                params: {
                    days,
                    id: assetId,
                    interval: 'daily',
                    precision: 2,
                    vs_currency: 'usd'
                }
            });

            return { id: assetId, ...data };
        } catch (err) {
            console.warn(err);
            throw new Error('FAILED_TO_GET_HISTORICAL_DATA');
        }
    }
}

export default AssetsAPI;
