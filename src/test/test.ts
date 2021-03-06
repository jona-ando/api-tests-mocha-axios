import {
  expect,
} from "chai";
import config from "config";
import moment from "moment";
import {
  sendRequest,
} from "../support/utils";

describe("Get characters", function () {
  const url = `${config.get("url")}characters`;
  const headers = {
    "Content-Type": "application/json",
    Date: moment().format("YYYY-MM-DD HH:mm:ss"),
  };

  let charName;

  const params: {
        [key: string]: any;
    } = {
      apikey: config.get("apikey"),
      ts: config.get("ts"),
      hash: config.get("hash"),
      name: String,
    };

  it("Get Spider-Man", async function () {
    charName = params.name = "Spider-Man";

    const response = await sendRequest({
      method: "get",
      url,
      params,
      headers,
    });
    expect(response.data.data.results[0].name).to.equal(charName);
    expect(response.status).to.equal(200);
  });

  // Negative test case when empty is exected
  it("Get inexistent character", async function () {
    charName = params.name = "Olesia-Superhero";

    const response = await sendRequest({
      method: "get",
      url,
      params,
      headers,
    });
    expect(response.data.data.results).to.deep.equal([]);
    expect(response.status).to.equal(200);
  });
});
