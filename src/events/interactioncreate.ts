import { CommandInteraction, Interaction, InteractionType } from "discord.js";

//This logs all interactions
module.exports = {
  name: "interactionCreate",
  execute(interaction: Interaction) {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      switch (interaction.channel?.type) {
        case "GUILD_TEXT":
        case "GUILD_NEWS":
          console.log(
            `${interaction.createdAt} ${interaction.user.tag} in #${interaction.channel.name} triggered a ${interaction.type} called ${interaction.commandName}.`
          );
        case "GUILD_NEWS_THREAD":
        case "GUILD_PUBLIC_THREAD":
        case "GUILD_PRIVATE_THREAD":
          console.log(
            `${interaction.createdAt} ${interaction.user.tag} in #${interaction.channel.parent?.name} in thread ${interaction.channel.name} triggered a ${interaction.type} called ${interaction.commandName}.`
          );
      }
    }
  },
};
