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
    console.error("Error fetching welcome API:", err);
    throw new Error("Failed to fetch welcome data. Please try again.");
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
    console.error("Error fetching question:", err);
    throw new Error("Failed to fetch question data. Please try again.");
  }
}

export async function fetchReports() {
  try {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
    });

    const response = await fetch(codeHelpReportingBackend + `/codehelp/questions_solved/anurag/Easy`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching reports:", err);
    throw new Error("Failed to fetch reports. Please try again.");
  }
}

export async function login(loginId, password, otpEnabled, loginType) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    const body = JSON.stringify({
      login_id: loginId,
      password: password,
      otp_enabled_login: otpEnabled,
      login_type: loginType
    });

    const response = await fetch(codeHelpReportingBackend + `/codehelp/login`, {
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
    console.error("Error during login:", err);
    throw new Error("Login failed. Please check your credentials and try again.");
  }
}

export async function checkToken(token) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    const body = JSON.stringify({
      token: token,
    });

    const response = await fetch(codeHelpReportingBackend + `/codehelp/check/token`, {
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
    console.error("Error checking token:", err);
    throw new Error("Token verification failed. Please log in again.");
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
    console.error("Error fetching default code:", err);
    throw new Error("Failed to fetch default code. Please try again.");
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
      "Content-Type": "application/json",
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
      throw new Error("Failed to submit code. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error submitting code:", err);
    throw new Error("Failed to submit code. Please check your connection and try again.");
  }
}

export async function compileCodeApi(
  compilerType,
  code,
  runOnAll,
  testCase,
  qid
) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const body = JSON.stringify({
      compilerType: CompilerTypeEnums.fromValue(compilerType),
      qid: qid,
      code: code,
      runOnAll: runOnAll,
      testCase: testCase,
    });

    const response = await fetch(`/compile/code`, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error("Failed to compile code. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error compiling code:", err);
    throw new Error("Failed to compile code. Please check your syntax and try again.");
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
    console.error("Error fetching generic list:", err);
    throw new Error("Failed to fetch data. Please try again.");
  }
}

export async function chatApi(question) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
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
    console.error("Error calling chat API:", err);
    throw new Error("Failed to get AI response. Please try again.");
  }
}

export async function getMainCodeVariables(qid, language) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
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
    console.error("Error fetching main code variables:", err);
    throw new Error("Failed to fetch code variables. Please try again.");
  }
}
