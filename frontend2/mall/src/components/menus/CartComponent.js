import { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getCartItemsAsync } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      dispatch(getCartItemsAsync());
    }
  }, [isLogin]);

  return (
    <div className="w-full">
      {isLogin ? (
        <div>{loginState.nickname}'s Cart</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CartComponent;
