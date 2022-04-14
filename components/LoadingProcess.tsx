import { LinearProgress } from "@rneui/themed/dist/LinearProgress";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function LoadingProcess() {
  const loading = useSelector<RootState, boolean>(
    (state) => state.load.count > 0
  );

  return (
    <>
      {loading && (
        <LinearProgress
          color="cyan"
          trackColor="teal"
          style={{ position: "absolute", zIndex: 9999, height: 5, top: 0 }}
        ></LinearProgress>
      )}
    </>
  );
}
