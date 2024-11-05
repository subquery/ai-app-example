import type { ProjectManifest } from "jsr:@subql/ai-app-framework";
import { ConfigType } from "./project.ts";

const project: ProjectManifest = {
  specVersion: "0.0.1",
  // Specify any hostnames your tools will make network requests too
  endpoints: [],

  // Your projects runtime configuration options
  config: JSON.parse(JSON.stringify(ConfigType)), // Convert to JSON Schema
  model: "llama3.1",
  entry: "./project.ts",
};

export default project;
