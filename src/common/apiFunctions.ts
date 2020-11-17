import hex2ascii from 'hex2ascii';
import {
    web3Accounts,
    web3Enable,
    web3FromAddress,
    web3ListRpcProviders,
    web3UseRpcProvider,
    web3FromSource
} from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Epi } from '../dataTypes';

async function sendTransaction() {
    // console.log(web3ListRpcProviders);
    // console.log(web3UseRpcProvider);
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    const allInjected = await web3Enable('Theriak Frontend');

    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    const allAccounts = await web3Accounts();

    const account = allAccounts[0];
    // console.log(api.tx.trust);
    // here we use the api to create a balance transfer to some account of a value of 12344
    const transferExtrinsic = api.tx.trust.issueTrust('5C5555yEXUcmEJ5kkcCMvdZjUo7NGJiQJMS7vZXEeoMhj3VQ');

    // to be able to retrieve the signer interface from this account
    // we can use web3FromSource which will return an InjectedExtension type
    const injector = await web3FromSource(account.meta.source);

    // passing the injected account address as the first argument of signAndSend
    // will allow the api to retrieve the signer and the user will see the extension
    // popup asking to sign the balance transfer transaction

    transferExtrinsic.signAndSend(account.address, { signer: injector.signer }, ({ status }) => {
        if (status.isInBlock) {
            console.log(`Completed at block hash #${status.asInBlock.toString()}`);
        } else {
            console.log(`Current status: ${status.type}`);
        }
    }).catch((error: any) => {
        console.log(':( transaction failed', error);
    });
}

async function attestAffirmative(id: number) {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    const allInjected = await web3Enable('Theriak Frontend');
    const allAccounts = await web3Accounts();
    let account = allAccounts[0]
    const injector = await web3FromSource(account.meta.source);

    const attestExtrinsic = api.tx.peaceIndicators
        .attestPositive(id)
        .signAndSend(account.address, { signer: injector.signer }, (result) => {
            console.log(`Current status is ${result.status}`);

            if (result.status.isInBlock) {
                alert(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
                alert(`Transaction is finalized at blockHash ${result.status.asFinalized}`)
            }
        });
}

async function attestNegative(id: number) {
    // TODO:  could make this a global variable or pass it through props or something
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    const allInjected = await web3Enable('Theriak Frontend');
    const allAccounts = await web3Accounts();
    let account = allAccounts[0]
    const injector = await web3FromSource(account.meta.source);


    // currently we just get the first account
    // need to figure out how to get polkadot.js extension to choose accounts
    // but this is fine i guess

    const attestExtrinsic = api.tx.peaceIndicators
        .attestNegative(id)
        .signAndSend(account.address, { signer: injector.signer }, (result) => {
            console.log(`Current status is ${result.status}`);

            if (result.status.isInBlock) {
                alert(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
                alert(`Transaction is finalized at blockHash ${result.status.asFinalized}`)
            }
        });
}

async function submitEpis(epis: Array<string>) {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    const allInjected = await web3Enable('Theriak Frontend');
    const allAccounts = await web3Accounts();
    let account = allAccounts[0]
    const injector = await web3FromSource(account.meta.source);

    const attestExtrinsic = api.tx.peaceIndicators
        .sudo_submit_new_indicator_set(epis)
        .signAndSend(account.address, { signer: injector.signer }, (result) => {
            console.log(`Current status is ${result.status}`);

            if (result.status.isInBlock) {
                alert(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
                alert(`Transaction is finalized at blockHash ${result.status.asFinalized}`)
            }
        });
}

const chainEpiList = async (): Promise<Array<Epi>> => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });

    const epiSize = await api.query.peaceIndicators.indicatorSize();
    let epis: Array<Epi> = new Array();
    for (let i = 0; i < parseInt(epiSize.toString()); i++) {
        let epi = await api.query.peaceIndicators.peaceIndicators(i);
        let text = hex2ascii(epi.toString());
        epis[i] = { id: i, text: text };
    }

    return epis;
}

const submitIssueTrust = async (address: string) => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    const allInjected = await web3Enable('Theriak Frontend');
    const allAccounts = await web3Accounts();
    let account = allAccounts[0]
    const injector = await web3FromSource(account.meta.source);

    const attestExtrinsic = api.tx.trust
        .issueTrust(address)
        .signAndSend(account.address, { signer: injector.signer }, (result) => {
            console.log(`Current status is ${result.status}`);

            if (result.status.isInBlock) {
                alert(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
                alert(`Transaction is finalized at blockHash ${result.status.asFinalized}`)
            }
        });
}

const submitRevokeTrust = async (address: string) => {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    const allInjected = await web3Enable('Theriak Frontend');
    const allAccounts = await web3Accounts();
    let account = allAccounts[0]
    const injector = await web3FromSource(account.meta.source);

    const attestExtrinsic = api.tx.trust
        .removeTrust(address)
        .signAndSend(account.address, { signer: injector.signer }, (result) => {
            console.log(`Current status is ${result.status}`);

            if (result.status.isInBlock) {
                alert(`Transaction included at blockHash ${result.status.asInBlock}`);
            } else if (result.status.isFinalized) {
                alert(`Transaction is finalized at blockHash ${result.status.asFinalized}`)
            }
        });
} 

export { submitEpis, chainEpiList, attestNegative, attestAffirmative, sendTransaction, submitIssueTrust, submitRevokeTrust }