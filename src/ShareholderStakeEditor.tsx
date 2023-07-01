import { useState } from "react";
import { captureEvent } from "@sentry/react";
import { map } from "lodash";

import { Shareholder } from "./shareholder";
import { useShareholders } from "./useShareholders.hook";
import { useShareholder } from "./useShareholder.hook";

export interface ShareholderStakeEditorProps {
  readonly companyId: string;
  readonly shareholder: Shareholder;
  readonly onClickClose: VoidFunction;
}

function ShareholderStakeEditor({
  companyId,
  shareholder,
  onClickClose,
}: ShareholderStakeEditorProps) {
  const [stake, setStake] = useState(shareholder.stake);

  const { shareholders, refetchShareholders } = useShareholders();

  const { enableds, others, othersStakesSum, patchShareholderStake } =
    useShareholder({ shareholder, shareholders });

  const othersAndThisStakesSum = othersStakesSum + stake;

  const event = {
    tags: {
      companyId,
      shareholderId: shareholder.id,
      stake,
      enabledsIds: JSON.stringify(map(enableds, "id")),
      othersIds: JSON.stringify(map(others, "id")),
      othersStakesSum,
      othersAndThisStakesSum,
    },
    data: {
      shareholders,
      enableds,
      others,
    },
  };

  const showValidationErrorSelectedNodeStake = () => {
    console.log("showValidationErrorSelectedNodeStake called");
    alert("All stakes should add up to no more than 100%.");
  };

  const handleClickSave = async () => {
    if (othersAndThisStakesSum <= 100) {
      captureEvent({
        level: "info",
        message: "useShareholderStakeEditor/changeStakeValid",
        tags: event.tags,
        contexts: {
          ["useShareholderStakeEditor/changeStakeValid"]: event.data,
        },
      });

      const patchStakeResult = await patchShareholderStake({
        id: shareholder.id,
        stake,
      });

      captureEvent({
        level: "info",
        message: "useShareholderStakeEditor/changeStakePatchCompleted",
        tags: event.tags,
        contexts: {
          ["useShareholderStakeEditor/changeStakePatchCompleted"]: {
            ...event.data,
            patchStakeResult,
          },
        },
      });

      const refetchShareholdersResult = await refetchShareholders();

      captureEvent({
        level: "info",
        message: "useShareholderStakeEditor/changeStakeRefreshCompleted",
        tags: event.tags,
        contexts: {
          ["useShareholderStakeEditor/changeStakeRefreshCompleted"]: {
            ...event.data,
            refetchShareholdersResult,
          },
        },
      });
    } else {
      captureEvent({
        level: "info",
        message: "useShareholderStakeEditor/changeStakeSumError",
        tags: event.tags,
        contexts: {
          ["useShareholderStakeEditor/changeStakeSumError"]: event.data,
        },
      });

      showValidationErrorSelectedNodeStake();
    }
  };

  return (
    <dialog open>
      <label>Shareholder value</label>
      <br />
      <input
        type="number"
        value={stake}
        onChange={(e) => setStake(Number(e.target.value))}
      />
      <br />
      <button onClick={handleClickSave}>Save</button>{" "}
      <button onClick={onClickClose}>Close</button>
    </dialog>
  );
}

export default ShareholderStakeEditor;
