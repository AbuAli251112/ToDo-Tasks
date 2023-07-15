import baseUrl from '../Api/BaseUrl';

const useInserData = async (url, params) => {
    const res = await baseUrl.post(url, params);
    return res;
}

const useInsertDataWithToken = async (url, params) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const res = await baseUrl.post(url, params, config);
    return res;
}

export { useInserData, useInsertDataWithToken };