import AssetsAPI from './AssetsAPI';

const useAPI = () => {
    return {
        assetsAPI: new AssetsAPI()
    };
}

export default useAPI;
