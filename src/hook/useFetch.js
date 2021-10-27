import {useState, useEffect} from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect( async () => {
            try{
                const response = await fetch(url);
                const request = await response.json();

                if(!response.ok){
                    throw Error(`데이터를 불러오는데 실패했습니다. status:${response.status}`)
                }

                { request && setData(request) }
            }catch(e){
                setError(e)
            }
    },[url])
    return {data,error}
}

export default useFetch