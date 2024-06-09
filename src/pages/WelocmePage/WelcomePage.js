import React, { useState, useEffect } from "react";

function WelcomePage() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    let headers = new Headers({
      "Access-Control-Allow-Origin": "*",
    });
    fetch("http://localhost:8000/welcome/api", {
      method: "GET",
      headers: headers,
    })
      .then((result) => result.json())
      .then((data) => setResponse(data))
      .catch((err) => {
        console.log(
          "Got some error while fetching from the welcome api:" + err
        );
      });
  }, []);

  return (
    <div>
      {response ? <div>{response.message}</div> : <div>Loading...</div>}
    </div>
  );
}

export default WelcomePage;
