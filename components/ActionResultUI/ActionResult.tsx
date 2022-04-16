import React from "react";
import { PROCESS_STATUS } from "../../enum/PROCESS_ENUM";
import ProcessWaiting from "../ProcessWaiting";
import ActionCompleted from "./ActionCompleted";
import ActionFailure from "./ActionFailure";

export default function ActionFallback(props: {
  status: PROCESS_STATUS;
  message?: string;
}) {
  return (
    <>
      <ProcessWaiting
        visible={props.status === PROCESS_STATUS.DOING}
      ></ProcessWaiting>
      <ActionFailure
        visible={props.status === PROCESS_STATUS.FAILURE}
        message={props.message || ""}
      ></ActionFailure>
      <ActionCompleted
        visible={props.status === PROCESS_STATUS.COMPLETE}
        message={props.message || ""}
      ></ActionCompleted>
    </>
  );
}
