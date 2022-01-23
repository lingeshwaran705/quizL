import React, { useEffect } from "react";
import { setCount, setInitialCount } from "../../features/quiz/count";
import { useSelector, useDispatch } from "react-redux";

function Countdown() {
  const count = useSelector((state) => state.count.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(setCount());
    }, 1000);
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

export default React.memo(Countdown);
