import "./App.css";
import { ShareholdersList } from "./ShareholdersList";
import { MOCK_COMPANY } from "./entity.mocks";

function App() {
  return (
    <div className="App">
      <ShareholdersList companyId={MOCK_COMPANY.id} />
    </div>
  );
}

export default App;
