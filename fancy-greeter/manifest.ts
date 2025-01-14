import type { ProjectManifest } from "jsr:@subql/ai-app-framework";

const project: ProjectManifest = {
  specVersion: "0.0.1",
  // Specify any hostnames your tools will make network requests too
  endpoints: [],
  // Your projects runtime configuration options
  config: {}, 
  model: "llama3.1",
  entry: "./project.ts",
};

export default project;
