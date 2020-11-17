import React, { useState } from "react";

import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
  web3FromSource,
} from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";

const constructGraph = async () => {
  const wsProvider = new WsProvider("ws://127.0.0.1:9944");
  const api = await ApiPromise.create({ provider: wsProvider });
  const allInjected = await web3Enable("Theriak Frontend");
  const allAccounts = await web3Accounts();
  let account = allAccounts[0];
  const injector = await web3FromSource(account.meta.source);

  let edges = [[], [], [], []];

  let i = 0;
  let done = false;
  while (!done) {
    let trusted_account = await api.query.trust.trustIssuance(
      account.address,
      i
    );
    if (
      trusted_account.toHex() ===
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) {
      done = true;
    } else {
      edges[0].push(trusted_account.toString());
    }
    i += 1;
  }

  for (let i = 1; i < 4; i++) {
    edges[i - 1].forEach(async (element) => {
      let done = false;
      let j = 0;
      while (!done) {
        let trusted_account = await api.query.trust.trustIssuance(
          account.address,
          j
        );
        if (
          trusted_account.toHex() ===
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        ) {
          done = true;
        } else {
          edges[i].push(trusted_account.toString());
        }
        j += 1;
      }
    });
  }

  let result = [];
  for (let i = 0; i < 4; i++) {
    let count = 0;
    edges[i].forEach((element) => {
      result.push({
        id: count,
        name:
          element.substring(0, 4) +
          "..." +
          element.substring(element.length - 4, element.length),
        trustRate: 100 / (i + 1),
      });
      count++;
    });
  }

  return result;
};

export default constructGraph;
