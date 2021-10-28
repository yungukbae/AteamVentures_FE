import {useState, useEffect} from "react";

const useFetch = (url : string) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {

        const fetchData = async () => {
            try{
                const response = await fetch(url);
                const request = await response.json();

                if(!response.ok){
                    throw Error(`데이터를 불러오는데 실패했습니다. 에러코드:${response.status}`)
                }
                { request && setData(request) }
            }catch(e:any){
                setError(e)
            }
        }
        fetchData();

    },[url])
    return {data,error}
}

export default useFetch