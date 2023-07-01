import { Shareholder } from "./shareholder";

export const MOCK_SHAREHOLDERS_BY_ID: Record<string, Shareholder> = {
  "111": {
    id: "111",
    name: "Fernando Wilkinson",
    stake: 40,
    enabled: true,
  },
  "112": {
    id: "112",
    name: "[Deleted] Garth Booth",
    stake: 40,
    enabled: true,
  },
  "113": {
    id: "113",
    name: "Esperanza Meadows",
    stake: 0,
    enabled: true,
  },
  "114": {
    id: "114",
    name: "Conrad Duncan",
    stake: 0,
    enabled: false,
  },
};

export const MOCK_SHAREHOLDERS: readonly Shareholder[] = Object.values(
  MOCK_SHAREHOLDERS_BY_ID
);
