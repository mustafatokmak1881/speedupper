const axios = require("axios");
let allData = {};

getStaging = async (prefix, addition) => {
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
            boToken: "9711fc0274f7ce5a438f18ad84ae71c3",
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
      let url1 = "mehmet-bo-api-dev";
      const resp1 = await getStaging(url1, "");
      allData = resp1.response.data.data.accounts;

      console.log({
        allData,
      });
    } catch (error) {
      console.error(error);
    }
  })();
};

setInterval(() => {
  startTest();
}, 10000);