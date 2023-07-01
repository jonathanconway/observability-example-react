import { useEffect, useState } from "react";

import { Shareholder } from "./shareholder";

export function useShareholders() {
  const [shareholders, setShareholders] = useState<readonly Shareholder[]>([]);

  const fetchShareholders = async () => {
    const getShareholdersResponse = await fetch("/shareholders");
    const getShareholdersResponseBody = await getShareholdersResponse.json();

    console.log("fetchShareholders called", {
      getShareholdersResponseBody,
    });

    setShareholders(getShareholdersResponseBody);

    return getShareholdersResponseBody;
  };

  const refetchShareholders = async () => {
    console.log("refetchShareholders called");

    return fetchShareholders();
  };

  useEffect(() => {
    fetchShareholders();
  }, []);

  return {
    shareholders,
    refetchShareholders,
  };
}
