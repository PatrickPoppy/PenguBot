const { Event } = require("klasa");

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            enabled: true,
            once: false
        });
    }

    async run(member) {
        // Welcome Messages
        const guild = member.guild; // eslint-disable-line
        if (guild.configs.get("welcome-messages") === true) {
            if (!guild.channels.exists("id", guild.configs.get("welcome-channel"))) return;
            const channel = guild.channels.find("id", guild.configs.get("welcome-channel"));

            if (member.guild.configs.get("welcome-text") === null) { member.guild.configs.update("welcome-text", "Welcome {MENTION} to {GUILD_NAME}, we hope you enjoy your stay!"); }
            try {
                channel.send(this.replace(guild.configs.get("welcome-text"), member));
            } catch (e) {
                console.error(e);
            }
        }

        // Auto Roles
        if (guild.configs.get("autoroles") === true) {
            if (guild.configs.get("auto-roles")[0] === undefined) return;
            const roles = guild.configs.get("auto-roles");
            try {
                member.roles.add(roles, "Auto Roles");
            } catch (e) {
                console.error(e);
            }
        }
    }

    replace(text, member) {
        return text
            .replace(/{MENTION}/g, `<@${member.id}>`)
            .replace(/{GUILD_NAME}/g, member.guild.name)
            .replace(/{USERNAME}/g, member.user.username)
            .replace(/{DISPLAYNAME}/g, member.displayName)
            .replace(/{ID}/g, member.id);
    }

};
