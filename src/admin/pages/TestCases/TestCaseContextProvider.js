import { createContext, useState } from "react";

export const TestCaseContext = createContext();

function TestCaseContextProvider({ children }) {
    const [testCases, setTestCases] = useState(["1st test case", "2nd test case"]);
  return (
    <TestCaseContext.Provider value={{testCases, setTestCases}}>
      {children}
    </TestCaseContext.Provider>
  );
}

export default TestCaseContextProvider;