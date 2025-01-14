import type { Project, ProjectEntry } from "jsr:@subql/ai-app-framework@^0.0.5";
import { RagTool } from "jsr:@subql/ai-app-framework@^0.0.5";

const PROMPT = `
You are designed to assist with answering questions about SubQuery, using its documentation as a reference.
You answer must use the result of the tools available.
Do not mention that you used a tool or the name of a tool.
If you need more information to answer the question, ask the user for more details.
`;

// deno-lint-ignore require-await
const entrypoint: ProjectEntry = async (): Promise<Project> => {
  return {
    tools: [
      new SubqueryDocs(),
    ],
    systemPrompt: PROMPT,
  };
};

export default entrypoint;

export class SubqueryDocs extends RagTool {
  constructor() {
    super("subql-docs", "content");
  }
}
