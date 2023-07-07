import * as LitJsSdk from "@lit-protocol/lit-node-client";

const litClient = new LitJsSdk.LitNodeClient();
await litClient.connect();
window.LitNodeClient= litClient;

export default litClient;
