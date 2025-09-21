import { use, useContext } from "react";
import { TestCaseContext } from "./TestC";


function TestCases() {
    //here we will learn Provider and context api
    const testCaseContext = useContext(TestCaseContext);
    console.log(testCaseContext);

  return (
    <div>
      <h1>Test Cases Page</h1>
      <p>This is the Test Cases page content.</p>
    </div>
    
  );
}
export default TestCases;