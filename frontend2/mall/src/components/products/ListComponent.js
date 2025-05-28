import React, { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { getList } from '../../api/productsAPI';
import FetchingModal from '../common/FetchingModal';
import { API_SERVER_HOST } from '../../api/todoAPI';
import PageComponent from '../common/PageComponent';

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: [],
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0 // 서버에서 0부터 시작하는 경우 보정 필요
  };
  const host = API_SERVER_HOST

function ListComponent(props) {
                                            //refresh : 동일한 페이지 눌었을때 갱신
    const{moveToList, moveToRead, page, size, refresh} = useCustomMove()

    const[serverData, setServerData] = useState(initState)

    const[fetching, setFetching] = useState(false)
    useEffect(() => {

        setFetching(true)

        getList({page, size}).then(data => {
            console.log("🔥 page 값:", page);
            console.log("🔥 current 값:", serverData.current);
            setServerData({...data, current:page})
            setFetching(false)
        });

    }, [page, size, refresh]);

    return (
 
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
        {fetching ? <FetchingModal /> : <></>}

        <div className="flex flex-wrap mx-auto p-6">
            {serverData.dtoList.map(product => (
            <div
                key={product.pno}
                className="w-1/3 p-1 rounded shadow-md border-2"
                onClick={() => moveToRead(product.pno)}
            >
                <div className="flex flex-col h-full">
                <div className="font-extrabold text-2xl p-2 w-full">
                    {product.pno}
                </div>
                
                <div className="text-1xl m-1 p-2 w-full flex flex-col">
                    <div className="w-full overflow-hidden">
                    <img
                        alt="product"
                        className="m-auto rounded-md w-60"
                        src={`${host}/api/products/view/s_${product.uploadedFileNames[0]}`}
                    />
                    </div>

                    <div className="bottom-0 font-extrabold bg-white">
                    <div className="text-center p-1">
                        이름: {product.pname}
                    </div>
                    <div className="text-center p-1">
                        가격: {product.price}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div> 
    );
}

export default ListComponent;