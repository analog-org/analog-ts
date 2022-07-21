// Discordjs dependancy

// const fs = require("fs");
import fs from "fs";
import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { client } from "../index";
import dotenv from "dotenv";



// dotenv dependancy

dotenv.config();
//Gets slash commands
const commands: string[] = [];
const cmdFiles = fs
  .readdirSync(`./src/commands`)
  .filter((file) => file.endsWith(".js"));

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN!);

for (const file of cmdFiles) {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
}

// This actually registers the slash commands into the guild
const regCMD = (clientId: string) => {
  rest
    .put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
};

export default regCMD;
