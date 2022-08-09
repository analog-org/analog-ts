import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { client } from "../../../index";

module.exports = {
  data: {
    name: `botInfo`,
  },
  async execute(interaction: ButtonInteraction) {
    try {
      const embed = new EmbedBuilder()
        .setColor(`#6bde36`)
        .setTitle(`${client.user?.username}'s commands`)
        .setDescription(`${client.user.username}`)
        .setThumbnail(client.user?.avatarURL({ forceStatic: false })!);

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({
        content: "This server has 0 commands",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
