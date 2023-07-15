import baseUrl from '../Api/BaseUrl';

const useGetData = async (url, params = []) => {
    const res = await baseUrl.get(url, params);
    return res;
};

const useGetDataToken = async (url) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, Accept: "application/json" }
    }
    const res = await baseUrl.get(url, config);
    return res.data;
}


export { useGetData, useGetDataToken };