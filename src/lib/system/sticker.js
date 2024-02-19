export async function sticker(messageUser, message, media, option) {
  if (messageUser.length === 0) {
    await message.reply(media, message.from, option);
  }
}
