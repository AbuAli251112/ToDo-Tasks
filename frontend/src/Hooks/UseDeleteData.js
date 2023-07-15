import baseUrl from '../Api/BaseUrl';

const useDeleteDataWithToken = async (url, params) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const res = await baseUrl.delete(url, config, params);
    return res.data;
}

export { useDeleteDataWithToken };