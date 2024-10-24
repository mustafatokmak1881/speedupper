const request = require("request");

getLocal = () => {
  return new Promise((resolve, reject) => {
    (async () => {
      var options = {
        method: "POST",
        url: "https://bo-api-staging.xpress-ix.com/sysapi/v1/account/search/filters",
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
          "cache-control": "no-cache",
          "content-type": "application/x-www-form-urlencoded",
          origin: "https://clientoffice-staging.xpress-ix.com",
          pragma: "no-cache",
          priority: "u=1, i",
          referer: "https://clientoffice-staging.xpress-ix.com/",
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
        form: {
          start: "0",
          end: "25",
          length: "25",
          page: "1",
          order: "id",
          orderType: "asc",
          boToken: "9711fc0274f7ce5a438f18ad84ae71c3",
          external_login: "null",
        },
      };
      request(options, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      });
    })();
  });
};

(async () => {

    const result = await getLocal();
    console.log({result});
})();
