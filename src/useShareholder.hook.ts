import { map, sum, without } from "lodash";
import { Shareholder } from "./shareholder";

export function useShareholder({
  shareholder,
  shareholders,
}: {
  shareholder: Shareholder;
  shareholders: readonly Shareholder[];
}) {
  const enableds = shareholders.filter((shareholder) => shareholder.enabled);
  const others = without(enableds, shareholder);
  const othersStakesSum = sum(map(others, "stake"));

  const patchShareholderStake = async ({
    id,
    stake,
  }: {
    id: string;
    stake: number;
  }) => {
    const patchShareholderStakeResponse = await fetch(`/shareholder/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ stake }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const patchShareholderStakeResponseBody =
      await patchShareholderStakeResponse.json();

    console.log("patchNodeStake called", {
      id,
      stake,
      patchShareholderStakeResponseBody,
    });

    return patchShareholderStakeResponseBody;
  };

  return {
    enableds,
    others,
    othersStakesSum,
    patchShareholderStake,
  };
}
