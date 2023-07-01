import { useEffect } from "react";
import { captureEvent } from "@sentry/react";

import { useShareholders } from "./useShareholders.hook";

export function useShareholdersAutoRefresh({
  companyId,
}: {
  companyId: string;
}) {
  const { refetchShareholders: refreshShareholders } = useShareholders();

  const refresh = async () => {
    console.log("shareholders auto refresh interval elapsed");

    const refetchShareholdersResult = await refreshShareholders();

    captureEvent({
      level: "info",
      message: "useShareholdersAutoRefresh/shareholdersAutoRefreshCompleted",
      tags: { companyId },
      contexts: {
        ["useShareholdersAutoRefresh/shareholdersAutoRefreshCompleted"]: {
          refetchShareholdersResult,
        },
      },
    });
  };

  useEffect(() => {
    const interval = setInterval(refresh, 30_000);

    refresh();

    return () => {
      clearInterval(interval);
    };
  }, []);
}
