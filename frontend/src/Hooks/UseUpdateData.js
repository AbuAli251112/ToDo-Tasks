import baseUrl from '../Api/BaseUrl';


const useInsUpdateDataWithToken = async (url, params) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const res = await baseUrl.put(url, params, config);
    return res;
}

export { useInsUpdateDataWithToken };