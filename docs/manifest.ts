import { ConfigType } from "./project.ts";
import type { ProjectManifest } from "jsr:@subql/ai-app-framework@^0.0.5";

const project: ProjectManifest = {
  specVersion: "0.0.1",
  vectorStorage: {
    type: "lancedb",
    path: "./db",
  },
  config: JSON.parse(JSON.stringify(ConfigType)), // Convert to JSON Schema
  model: "llama3.1",
  embeddingsModel: 'nomic-embed-text',
  entry: "./project.ts",
};

export default project;
