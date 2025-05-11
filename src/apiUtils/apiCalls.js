import { CompilerTypeEnums } from "../enums/CompilerTypeEnums";

const codeHelpAiBackend = "http://localhost:8080";
const codeHelpReportingBackend = "http://localhost:9000";
export async function fetchWelcomeApi() {
  try {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
    });

    const response = await fetch("/welcome/api", {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Got some error while fetching from the welcome API:", err);
    throw err;
  }
}

export async function fetchQuestionApi(qNo) {
  try {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
    });

    const params = new URLSearchParams({ qNo: qNo });
    const response = await fetch(`/get/question?${params.toString()}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(
      "Something went wrong while fetching questio from question API: ",
      err
    );
  }
}


export async function fetchReports() {
  try {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
    });


    const response = await fetch(codeHelpReportingBackend +`/codehelp/questions_solved/anurag/Easy`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(
      "Something went wrong while fetching questio from question API: ",
      err
    );
  }
}

export async function fetchDefaultCodeApi(qNo) {
  try {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
    });

    const params = new URLSearchParams({
      qid: qNo,
      compilerType: "JAVA",
      wrapperCodeType: "DEFAULT_CODE",
    });
    const response = await fetch(`/get/wrapper/code?${params.toString()}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(
      "Something went wrong while fetching wrapper code API: ",
      err
    );
  }
}

export async function submitCodeApi(
  compilerType,
  code,
  runOnAll,
  testCase,
  qid
) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json", // Add this header
    });

    const body = JSON.stringify({
      compilerType: CompilerTypeEnums.fromValue(compilerType),
      qid: qid,
      code: code,
      runOnAll: runOnAll,
      testCase: testCase,
    });

    const response = await fetch(`/submit/code`, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error("Something went wrong while compiling the code");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in compile code API: " + err);
  }
}

export async function fetchGenericListApi(page, count, listingEnum) {
  try {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
    });

    const params = new URLSearchParams({
      page: page,
      count: count,
      listingEnum: listingEnum,
    });
    const response = await fetch(`/list/generic?${params.toString()}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(
      "Something went wrong while fetching wrapper code API: ",
      err
    );
  }
}

export async function chatApi(question) {
  try {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    });

    const body = JSON.stringify({
      question: question,
    });
    const response = await fetch(codeHelpAiBackend + `/chat`, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Something went wrong while calling chat api: ", err);
  }
}

export async function getMainCodeVariables(qid, language) {
  try {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    });

    const body = JSON.stringify({
      qid: qid,
      language: language,
    });
    const response = await fetch("/get/mainCode/variables", {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Something went wrong while calling chat api: ", err);
  }
}
