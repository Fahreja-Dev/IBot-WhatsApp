import { sizeFile } from "./sizeFile.js";
import { formatFile } from "./formatFile.js";

export function formatMessage(message) {
  if (message.type === "image") {
    return `Telah Mengirim Foto [size: ${sizeFile(message._data.size)}]`;
  } else if (message.type === "sticker") {
    return "Telah Mengirim Sticker";
  } else if (message.type === "document") {
    for (const [key, value] of Object.entries(formatFile)) {
      if (value === message._data.mimetype) {
        return `Telah Mengirim Document [${message.body.substring(
          0,
          message.body.length - `.${key}`.length
        )}] [type: ${key}] [size: ${sizeFile(message._data.size)}]`;
      }
    }
    return `Telah Mengirim Document [${message.body}]`;
  } else if (message.type === "video") {
    return `Telah Mengirim Video [size: ${sizeFile(message._data.size)}]`;
  } else if (message.type === "audio") {
    return `Telah Mengirim Audio [size: ${sizeFile(message._data.size)}]`;
  } else {
    return message.body;
  }
}
