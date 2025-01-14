import { JsonRpcProvider } from "npm:ethers";
import {
  BetterIndexerApy,
  CurrentDelegatorApy,
  DelegatedIndexers,
  TokenBalance,
  TotalDelegation,
  UnclaimedDelegatorRewards,
} from "./tools.ts";
import { type Static, Type } from "npm:@sinclair/typebox";
import type { Project, ProjectEntry } from "jsr:@subql/ai-app-framework@^0.0.5";

export const ConfigType = Type.Object({
  GRAPHQL_ENDPOINT: Type.String({
    default: "https://api.subquery.network/sq/subquery/subquery-mainnet",
  }),
  BASE_RPC: Type.String({
    default: "https://gateway.subquery.network/rpc/base-full",
  }),
  BASE_SQT_ADDR: Type.String({
    default: "0x858c50C3AF1913b0E849aFDB74617388a1a5340d",
  }),
});

export type Config = Static<typeof ConfigType>;

const PROMPT = `
You are an agent designed to help a user with their token delegation on the SubQuery Network.
Given an input question, use the available tools to answer the users question quickly and concisely.
You answer must use the result of the tools available.
Do not mention that you used a tool or the name of a tool.
If you need more information to answer the question, ask the user for more details.
All token amounts are in SQT.

If the question seems to be unrelated to the API, just return "I don't know" as the answer.
`;

// deno-lint-ignore require-await
const entrypoint: ProjectEntry = async (config: Config): Promise<Project> => {
  return {
    tools: [
      new TotalDelegation(config.GRAPHQL_ENDPOINT),
      new DelegatedIndexers(config.GRAPHQL_ENDPOINT),
      new UnclaimedDelegatorRewards(config.GRAPHQL_ENDPOINT),
      new CurrentDelegatorApy(config.GRAPHQL_ENDPOINT),
      new BetterIndexerApy(config.GRAPHQL_ENDPOINT),
      new TokenBalance(
        new JsonRpcProvider(config.BASE_RPC),
        config.BASE_SQT_ADDR,
      )
    ],
    systemPrompt: PROMPT,
  };
};

export default entrypoint;
