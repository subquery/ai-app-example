import { type Config, ConfigType } from "./project.ts";
import type { ProjectManifest } from "jsr:@subql/ai-app-framework@^0.0.5";
import { Value } from "npm:@sinclair/typebox/value";

/** Gets the host names of any urls in a record */
export function extractConfigHostNames(
  config: Record<string, string>,
): string[] {
  const hosts = Object.values(config)
    .filter((v) => typeof v === "string")
    .map((v) => {
      try {
        return new URL(v).hostname;
      } catch (_e) {
        return undefined;
      }
    })
    .filter((v) => !!v) as string[]; // Cast should be unnecessary with latest TS versions

  // Make unique
  return [...new Set(hosts)];
}

const defaultConfig = Value.Default(ConfigType, {} as Config) as Config;

const project: ProjectManifest = {
  specVersion: "0.0.1",
  endpoints: extractConfigHostNames(defaultConfig),
  vectorStorage: {
    type: "lancedb",
    // path: "./db.tar.gz",
    // path: "./db",
    // You can also provide an HTTP url to an archive of the db
    path: "https://github.com/subquery/subql-ai-app-example/raw/refs/heads/main/db.tar.gz",
  },
  config: JSON.parse(JSON.stringify(ConfigType)), // Convert to JSON Schema
  model: "llama3.1",
  // model: "gpt-3.5-turbo",
  embeddingsModel: 'nomic-embed-text',
  // embeddingsModel: "text-embedding-3-small",
  entry: "./project.ts",
};

export default project;
