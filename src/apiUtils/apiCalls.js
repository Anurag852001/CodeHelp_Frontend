import { CompilerTypeEnums } from "../enums/CompilerTypeEnums";

const codeHelpAiBackend = "http://localhost:8080";
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

export async function submitCodeApi(compilerType, code) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json", // Add this header
    });

    const body = JSON.stringify({
      compilerType: CompilerTypeEnums.fromValue(compilerType),
      qid: 6,
      code: code,
    });

    const response = await fetch(`/compile/code`, {
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
