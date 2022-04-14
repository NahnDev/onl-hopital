import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { PROCESS_STATUS } from "../enum/PROCESS_ENUM";
import { AppDispatch, RootState } from "../store";
import ProcessActions from "../store/actions/process.actions";
import { ProcessState } from "../store/slices/process.slice";

export default function useProcess(key: keyof ProcessState) {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);
  const status = useSelector<
    RootState,
    { status: PROCESS_STATUS; message?: string }
  >((state) => state.process[key]);

  const complete = (message?: string) => {
    dispatch(ProcessActions.complete(key, message));
  };
  const reset = (message?: string) => {
    dispatch(ProcessActions.reset(key, message));
  };
  const failure = (message?: string) => {
    dispatch(ProcessActions.failure(key, message));
  };
  const start = (message?: string) => {
    dispatch(ProcessActions.start(key, message));
  };

  return { status, complete, reset, failure, start };
}
