import { useState } from "react";

import { Shareholder } from "./shareholder";
import { useShareholders } from "./useShareholders.hook";
import ShareholderStakeEditor from "./ShareholderStakeEditor";
import { useShareholdersAutoRefresh } from "./useShareholdersAutoRefresh.hook";

interface ShareholdersListState {
  editingShareholder?: Shareholder;
}

export function ShareholdersList({ companyId }: { companyId: string }) {
  const { shareholders } = useShareholders();

  useShareholdersAutoRefresh({ companyId });

  const [state, setState] = useState<ShareholdersListState>({});

  const handleOpenStakeEditorClick = (shareholder: Shareholder) => {
    setState({
      ...state,
      editingShareholder: shareholder,
    });
  };

  const handleCloseStakeEditorClick = () => {
    setState({ editingShareholder: undefined });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stake</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shareholders.map((shareholder) => (
            <tr key={shareholder.id}>
              <td>{shareholder.name}</td>
              <td>{shareholder.stake}%</td>
              <td>
                <button onClick={() => handleOpenStakeEditorClick(shareholder)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {state.editingShareholder && (
        <ShareholderStakeEditor
          companyId={companyId}
          shareholder={state.editingShareholder}
          onClickClose={handleCloseStakeEditorClick}
        />
      )}
    </>
  );
}
