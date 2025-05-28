import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const Loading = <div>Loading...</div>;
const PlanPage = lazy(() => import('../pages/plans/PlanPage'));

const plansRouter = () => [
  {
    path: 'recommend',
    element: <Suspense fallback={Loading}><PlanPage /></Suspense>
  },
  {
    path: '',
    element: <Navigate replace to="recommend" />
  }
];

export default plansRouter;
