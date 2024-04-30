import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
const Counter = () => {
  const [userInput,setUserInput] = useState(1);
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(reset())}>reset</button>
        <input type="number" value={userInput} onChange={(e)=>setUserInput(e.target.value)} />
        <button onClick={() => dispatch(incrementByAmount(Number(userInput)))}>change by amount</button>
      </div>
    </section>
  );
};

export default Counter;
