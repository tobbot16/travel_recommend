import { useState } from "react"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const getNum = (param, defaultValue) => {

    if(!param){
        return defaultValue
    }

    return parseInt(param)

}



const useCustomMove = () => {

    const navigate = useNavigate()

    const [refresh, setRefresh] = useState(false)

    const [queryParams] = useSearchParams()

    const page = getNum(queryParams.get('page'), 1)
    const size = getNum(queryParams.get('size'), 10)
    
    //page=3&size=10
    const queryDefault = createSearchParams({page,size}).toString()

    const moveToList = (pageParam) => {

        let queryStr = ""
        if(pageParam){
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 10)

            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString()

        }else{
            queryStr = queryDefault
        }
        setRefresh(!refresh)
        navigate({pathname:`../list`, search:queryStr})

    }

    const moveToModify = (tno) => {
        navigate({
            pathname:`../modify/${tno}`,
            search:queryDefault
        })
    }

    const moveToRead = (tno) => {
        navigate({
            pathname:`../read/${tno}`,
            search:queryDefault
        })

    }




    return {moveToList, moveToModify, moveToRead, page, size, refresh}

}


export default useCustomMove