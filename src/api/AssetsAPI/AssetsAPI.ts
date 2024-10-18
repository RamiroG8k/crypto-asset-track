import axios from 'axios';
import { type Asset } from './types';

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
            throw new Error('HEALTH_CHECK_FAILED');
        }
    }

    async getCoinsList(cache = true): Promise<Asset[]> {
        try {
            const cacheKey = 'assets';

            if (cache) {
                const cachedAssets = localStorage.getItem(cacheKey);

                if (cachedAssets) {
                    return JSON.parse(cachedAssets) as Asset[];
                };
            }

            const { data } = await this.client.get('/coins/markets', {
                params: {
                    category: 'layer-1',
                    include_platform: false,
                    per_page: 10,
                    vs_currency: 'usd'
                }
            });

            localStorage.setItem(cacheKey, JSON.stringify(data));

            return data;
        } catch (err) {
            throw new Error('FAILED_TO_GET_ASSETS');
        }
    }
}

export default AssetsAPI;
