import {useState, useEffect} from "react";

const useFetch = (url : string) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {

        const fetchData = async () => {
            try{
                const response = await fetch(url);                                      //fetch요청 응답 값을 넣기위한 변수
                const result = await response.json();                                   //오브젝트 구문으로 변수에 저장

                if(!response.ok){
                    throw Error(`데이터를 불러오는데 실패했습니다. 에러코드:${response.status}`)
                }
                { result && setData(result) }                                           
            }catch(e:any){
                setError(e)
            }
        }
        fetchData();

    },[url])
    return {data,error}
}

export default useFetch