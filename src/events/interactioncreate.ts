import { CommandInteraction, Interaction, InteractionType } from "discord.js";

//This logs all interactions
module.exports = {
  name: "interactionCreate",
  execute(interaction: Interaction) {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      switch (interaction.channel?.type) {
        case "GUILD_TEXT":
          console.log(
            `${interaction.createdAt} ${interaction.user.tag} in #${interaction.channel.name} triggered a ${interaction.type} called ${interaction.commandName}.`
          );
      }
    }
  },
};
