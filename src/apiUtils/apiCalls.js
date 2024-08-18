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
