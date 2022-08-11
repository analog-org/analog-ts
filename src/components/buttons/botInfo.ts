import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  EmbedBuilder,
  MessageActionRowComponentBuilder,
  SelectMenuBuilder,
} from "discord.js";
import { client } from "../../../index";

module.exports = {
  data: {
    name: `botInfo`,
  },
  async execute(interaction: ButtonInteraction) {
    try {
      const row =
        new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
          new SelectMenuBuilder()
            .setCustomId("currentMood")
            .setOptions([{ label: "happy", value: "option_one", emoji: "😃" }, { label: 'sad', value: 'option_two', emoji: "😭"}, { label: 'mischievous', value: 'option_three', emoji: "😈"}])
        );
      const embed = new EmbedBuilder()
        .setColor(`#6bde36`)
        .setTitle(`${client.user?.username}'s commands`)
        .setDescription(`${client.user.username}`)
        .setThumbnail(client.user?.avatarURL({ forceStatic: false }));

      await interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      await interaction.reply({
        content: "This server has 0 commands",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};
