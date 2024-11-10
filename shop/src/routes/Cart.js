import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice";
import { increaseCount } from "../store";
import { useEffect } from "react";

function Cart() {
  let dispatch = useDispatch();

  // dispatch(addItem());
  // let cart = useSelector((state) => {
  //   return state.카트_cart;
  // });

  // let user = useSelector((state) => {
  //   return state.유저_user;
  // });

  let state = useSelector((state) => {
    return state;
  });

  return (
    <div>
      <h6>
        {state.유저_user.name} {state.유저_user.age} 의 장바구니
      </h6>
      <button
        onClick={() => {
          dispatch(increase(10));
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.카트_cart.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(increaseCount({ itemId: item.id }));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
