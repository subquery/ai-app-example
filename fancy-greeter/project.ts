import {
  FunctionTool,
  type Project,
  type ProjectEntry,
} from "jsr:@subql/ai-app-framework";

class ReverseNameTool extends FunctionTool {
  description = `This tool reverses the users name.`;
  parameters = {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        description: "The name of the user",
      },
    },
  };

  async call({ name }: { name: string }): Promise<string | null> {
    // Reverse the order of the input name
    return await name.split("").reverse().join("");
  }
}

// deno-lint-ignore require-await
const entrypoint: ProjectEntry = async (): Promise<Project> => {
  return {
    tools: [new ReverseNameTool()],
    systemPrompt:
      `You are an agent designed to greet a user in the strangest way possible.
    Always ask for the users name first before you greet them, once you have this information, you can greet them in a unique way.
    Your greeting should be weird, perhaps a pun or dad joke with their name. Please be funny, interesting, weird, and/or unique.
    ALWAYS REVERSE THEIR NAME USING THE REVERSENAMETOOL BEFORE GREETING THEM!
    Do not mention that you used a tool or the name of a tool.
    If you need more information to answer to greet the user, ask the user for more details.`,
  };
};

export default entrypoint;
