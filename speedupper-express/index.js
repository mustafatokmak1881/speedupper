const app = require("express")();
const http = require("http").createServer(app);
const axios = require("axios");
const { url } = require("inspector");

const port = 3006;
let allData = {};
const prefixUrl = process.argv[3];
const timerInterval = parseInt(process.argv[2]);

if (!prefixUrl && !timerInterval) {
  console.log(`
Usage:
  node . 3000 staging  
  `);
}

http.listen(port, () => {
  console.log(`Listening *: ${port}`);
  setInterval(() => {
    startTest();
  }, timerInterval);
});

app.get("/", (req, res) => {
  res.send("Express Server is Running ...");
});

app.get("/accounts", (req, res) => {
  res.send(allData);
});

getData = async (prefix, addition, boToken) => {
  return new Promise((resolve, reject) => {
    (async () => {
      const startTime = Date.now();
      try {
        const url = `https://${prefix}.xpress-ix.com/sysapi/v1/account/search/filters${addition}`;
        const response = await axios.post(
          url,
          {
            start: "0",
            end: "25",
            length: "25",
            page: "1",
            order: "id",
            orderType: "asc",
            boToken,
            external_login: "null",
          },
          {
            headers: {
              accept: "application/json, text/plain, */*",
              "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
              "cache-control": "no-cache",
              "content-type": "application/x-www-form-urlencoded",
              pragma: "no-cache",
              priority: "u=1, i",
              "sec-ch-ua":
                '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
            },
          }
        );

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        resolve({ responseTime, response });
      } catch (error) {
        reject(error);
      }
    })();
  });
};

startTest = () => {
  (async () => {
    try {
      let url1;
      let resp1;

      if (prefixUrl === "prod") {
        url1 = "bo-api";
        console.log({ url: url1 });
        resp1 = await getData(url1, "", "7d69ae1a90a17124f6621b61426f7ff9");
      } else {
        url1 = "mehmet-bo-api-dev";
        console.log({ url: url1 });
        resp1 = await getData(url1, "", "26acf2118031eafb4b74a4b6947d56f7");
      }

      if (
        resp1 &&
        resp1.response &&
        resp1.response.data &&
        resp1.response.data.data &&
        resp1.response.data.data.accounts
      ) {
        allData = resp1.response.data.data.accounts;
      }
    } catch (error) {
      console.error(error);
    }
  })();
};
