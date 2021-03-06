const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text", "dm"],
            cooldown: 5,
            aliases: ["pp", "profilepicture"],
            permLevel: 0,
            botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],
            description: (msg) => msg.language.get("COMMAND_SAY_DESCRIPTION"),
            usage: "[person:member]",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [person = msg.member]) {
        return msg.channel.send(`<:blobsmilehappy:373821679132213248> | ***${msg.language.get("MESSAGE_AVATAR")} ${person.user.tag}: ${person.user.displayAvatarURL({ size: 512 })}***`);
    }

};
