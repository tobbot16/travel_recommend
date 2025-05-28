import React, { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { getList } from '../../api/todoAPI';
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

function ListComponent(props) {
  const { page, size, refresh, moveToList, moveToRead} = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then(data => {
      console.log("📦 서버에서 받은 데이터:", data);

      // ✅ current 값을 1부터 시작하게 보정
      setServerData({
        ...data,
        current: page
      });
    });
  }, [page, size, refresh]); //page, size가 변하지 않으면 다시 페이지를 호출하지 않음

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      {/* 리스트 영역 */}
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.dtoList.map(todo => (
          <div
            key={todo.tno}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
            onClick={() => moveToRead(todo.tno)}
          >
            <div className="flex">
              <div className="font-extrabold text-2xl p-2 w-1/12">
                {todo.tno}
              </div>
              <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                {todo.title}
              </div>
              <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                {todo.dueDate}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 영역 */}
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      />
    </div>
  );
}

export default ListComponent;
