import React, { useEffect, useState } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { getRecommendedPlan, savePlan } from '../../api/planAPI';
import PlanCard from '../../components/plans/PlanCard';
import ResultModal from '../../components/common/ResultModal';
import FetchingModal from '../../components/common/FetchingModal';
import useCustomLogin from '../../hooks/useCustomLogin';

const areaCodeMap = {
  1: '서울',
  2: '인천',
  3: '대전',
  4: '대구',
  5: '광주',
  6: '부산',
  7: '울산',
  8: '세종특별자치시',
  31: '경기도',
  32: '강원도',
  33: '충청북도',
  34: '충청남도',
  35: '경상북도',
  36: '경상남도',
  37: '전라북도',
  38: '전라남도',
  39: '제주도'
};

function PlanPage() {
  const [plan, setPlan] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const [params, setParams] = useState({
    areaCode: 1,
    contentTypeId: 39,
    numOfDays: 3,
    withFamily: false,
    budgetLevel: 2
  });

  const { isLogin, moveToLogin } = useCustomLogin();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }));
  };

  const handleRecommend = async () => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      moveToLogin();
      return;
    }

    setFetching(true);
    try {
      const result = await getRecommendedPlan(params);
      setPlan(result);
    } catch (e) {
      alert('추천 실패');
    } finally {
      setFetching(false);
    }
  };

  const handleSave = async () => {
    try {
      const result = await savePlan(plan);
      setSaveResult('저장 성공');
    } catch (e) {
      setSaveResult('저장 실패');
    }
  };

  return (
    <BasicLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold mb-2">여행 일정 추천</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>지역</label>
            <select name="areaCode" value={params.areaCode} onChange={handleChange} className="w-full border rounded p-2">
              {Object.entries(areaCodeMap).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>여행 일수</label>
            <input type="number" name="numOfDays" value={params.numOfDays} onChange={handleChange}
                   className="w-full border rounded p-2" min="1" max="10" />
          </div>

          <div>
            <label>예산 수준</label>
            <select name="budgetLevel" value={params.budgetLevel} onChange={handleChange}
                    className="w-full border rounded p-2">
              <option value={1}>저렴 (1인당 1일 약 3만원 이하)</option>
              <option value={2}>중간 (약 3~7만원)</option>
              <option value={3}>고급 (7만원 이상)</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-3">
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" name="withFamily" checked={params.withFamily} onChange={handleChange} />
              <span>가족과 함께</span>
            </label>
          </div>
        </div>

        <div className="text-right">
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleRecommend}>추천 일정 보기</button>
        </div>

        {plan.length > 0 && (
          <>
            <h2 className="text-xl font-bold mt-4 mb-2">
              추천 결과 ({areaCodeMap[params.areaCode]})
            </h2>
            {plan.map((dayPlan) => (
              <PlanCard key={dayPlan.day} day={dayPlan.day} activities={dayPlan.activities} />
            ))}
            <div className="text-right">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>일정 저장</button>
            </div>
          </>
        )}
      </div>

      {fetching && <FetchingModal />}
      {saveResult && (
        <ResultModal
          title="일정 저장 결과"
          content={saveResult}
          callbackFn={() => setSaveResult(null)}
        />
      )}
    </BasicLayout>
  );
}

export default PlanPage;
