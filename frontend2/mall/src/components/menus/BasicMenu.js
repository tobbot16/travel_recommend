import { Link } from 'react-router-dom';
import useCustomLogin from '../../hooks/useCustomLogin';

function BasicMenu() {
  const { isLogin, loginState, doLogout } = useCustomLogin();

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-100 shadow">
      {/* 왼쪽: 메뉴 */}
      <div className="flex gap-6 items-center text-base font-semibold text-blue-600">
        <Link to="/" className="hover:underline">Main</Link>
        <Link to="/plans/recommend" className="hover:underline">일정추천</Link>
        <Link to="/todo" className="hover:underline">게시판</Link>
      </div>

      {/* 오른쪽: 사용자 상태 */}
      <div className="flex items-center gap-4 text-sm">
        {isLogin ? (
          <>
            <span className="text-gray-700">👤 {loginState.nickname}</span>
            <Link to="/member/modify" className="text-blue-600 hover:underline">
              마이페이지
            </Link>
            <button
              onClick={doLogout}
              className="text-red-500 hover:underline"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/member/login" className="text-blue-600 hover:underline">
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}

export default BasicMenu;
