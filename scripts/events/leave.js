const { getTime, drive } = global.utils;

module.exports = {
    config: {
        name: "leave",
        version: "1.5",
        author: "Raihan",
        category: "events"
    },

    langs: {
        en: {
            session1: "Morning",
            session2: "Afternoon",
            session3: "Evening",
            session4: "Night",
            leaveType1: "left voluntarily",
            leaveType2: "was removed from the group",
            defaultLeaveMessage:
`📌 **Notice**

**{userNameTag}** has left the **{threadName}** group.  
Reason: *{type}*  

We will miss their presence.`
        }
    },

    onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
        if (event.logMessageType !== "log:unsubscribe") return;

        const { threadID } = event;
        const threadData = await threadsData.get(threadID);
        if (!threadData.settings.sendLeaveMessage) return;

        const { leftParticipantFbId } = event.logMessageData;
        if (leftParticipantFbId == api.getCurrentUserID()) return;

        const hours = getTime("HH");
        const threadName = threadData.threadName;
        const userName = await usersData.getName(leftParticipantFbId);

        let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data;
        const form = {
            mentions: leaveMessage.includes("{userNameTag}") ? [{
                tag: userName,
                id: leftParticipantFbId
            }] : null
        };

        leaveMessage = leaveMessage
            .replace(/\{userName\}/g, userName)
            .replace(/\{userNameTag\}/g, userName)
            .replace(/\{type\}/g, leftParticipantFbId == event.author ? getLang("leaveType1") : getLang("leaveType2"))
            .replace(/\{threadName\}|\{boxName\}/g, threadName)
            .replace(/\{time\}/g, hours)
            .replace(/\{session\}/g, hours <= 10
                ? getLang("session1")
                : hours <= 12
                    ? getLang("session2")
                    : hours <= 18
                        ? getLang("session3")
                        : getLang("session4")
            );

        form.body = leaveMessage;

        if (threadData.data.leaveAttachment) {
            const files = threadData.data.leaveAttachment;
            const attachments = files.map(file => drive.getFile(file, "stream"));
            form.attachment = (await Promise.allSettled(attachments))
                .filter(({ status }) => status == "fulfilled")
                .map(({ value }) => value);
        }

        message.send(form);
    }
};
