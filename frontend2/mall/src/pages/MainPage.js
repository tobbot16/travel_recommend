import React from 'react';
import { Link } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';

function MainPage(props) {
  return (
    <BasicLayout>
      <div className="text-3xl font-bold mb-4">Main Page</div>

      <div className="mt-6 space-y-3">
        <div className="text-xl">
          <Link to="/plans/recommend" className="text-blue-500 underline">
            🧭 여행 일정 추천 보러 가기
          </Link>
        </div>
        {/* 다른 기능들도 아래에 추가 가능 */}
      </div>
    </BasicLayout>
  );
}
export default MainPage;