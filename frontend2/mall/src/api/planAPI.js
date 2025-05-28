// ✅ 기존 코드 (일반 axios 사용 중일 가능성 있음)
import axios from 'axios';

// ✅ 변경: jwtAxios 사용
import jwtAxios from '../util/JWTUtil'; // 경로는 프로젝트에 맞게 조정
import { API_SERVER_HOST } from "./todoAPI";

const PREFIX = `${API_SERVER_HOST}/api/plan`;

export const getRecommendedPlan = async (params) => {
  const res = await jwtAxios.post(`${PREFIX}/recommend`, params);
  return res.data;
};

export const savePlan = async (planData) => {
  const res = await jwtAxios.post(`${PREFIX}/save`, planData);
  return res.data;
};
