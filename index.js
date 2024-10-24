const axios = require("axios");
let averages = {};
let timer;

getAverageInArray = (arrayList) => {
  return new Promise((resolve, reject) => {
    (async () => {
      let sum = 0;
      arrayList.forEach((value, key) => {
        sum += value;
      });

      resolve(parseInt(sum / arrayList.length));
    })();
  });
};

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

        resolve({ responseTime });
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
      // console.log({ [url1]: resp });

      if (!averages[url1]) {
        averages[url1] = { average: 0, valuesCount: 0, responseTimes: [] };
      } else {
        averages[url1].responseTimes.push(resp1.responseTime);
        averages[url1].average = await getAverageInArray(
          averages[url1].responseTimes
        );
        averages[url1].valuesCount = averages[url1].responseTimes.length;
      }

      let url3 = "mehmet-bo-api-dev";
      const addition = "-new";
      const resp3 = await getStaging(url3, addition);
      // console.log({ [url1]: resp });

      if (!averages[`${url3}${addition}`]) {
        averages[`${url3}${addition}`] = {
          average: 0,
          valuesCount: 0,
          responseTimes: [],
        };
      } else {
        averages[`${url3}${addition}`].responseTimes.push(resp3.responseTime);
        averages[`${url3}${addition}`].average = await getAverageInArray(
          averages[`${url3}${addition}`].responseTimes
        );
        averages[`${url3}${addition}`].valuesCount =
          averages[`${url3}${addition}`].responseTimes.length;
      }

      let url2 = "bo-api-staging";
      const resp2 = await getStaging(url2, "");
      //console.log({ [url2]: resp1 });

      if (!averages[url2]) {
        averages[url2] = { average: 0, valuesCount: 0, responseTimes: [] };
      } else {
        averages[url2].responseTimes.push(resp2.responseTime);
        averages[url2].average = await getAverageInArray(
          averages[url2].responseTimes
        );
        averages[url2].valuesCount = averages[url2].responseTimes.length;
      }

      console.clear();
      for (let item in averages) {
        const valuesCount = averages[item].valuesCount;
        console.log({
          averages: {
            [item]: averages[item].average,
            valuesCount,
          },
        });

        if (valuesCount >= 150) {
          clearInterval(timer);
          console.log({ completed: valuesCount });
        }
      }
    } catch (error) {
      console.error(error);
    }
  })();
};

timer = setInterval(() => {
  startTest();
}, 2000);
