const API_AI_TOKEN = "64dc6c50407f4d9d84717c97c541c890";
const apiAiClient = require("apiai")(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN =
  "EAAQHe6GUs6IBAOfavvLdmQsuD86ZCuevNgKjTWHWlMms88OPzAwlNERb2z8WMOZAh58gmNyWZAV0fTY5Xf6LupX34rlfhZAr38SLWwltJblbXpg7C4NWZCNKXW5SYKm4PZCj1al97GX9Wq1Lrybey5UiyF91a0xdpcNSqqFkQcdwZDZD";
const request = require("request");
const sendTextMessage = (senderId, text) => {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: "POST",
    json: {
      recipient: { id: senderId },
      message: { text }
    }
  });
};
module.exports = event => {
  const senderId = event.sender.id;
  const message = event.message.text;
  const apiaiSession = apiAiClient.textRequest(message, {
    sessionId: "crowdbotics_bot"
  });
  apiaiSession.on("response", response => {
    const result = response.result.fulfillment.speech;
    sendTextMessage(senderId, result);
  });
  apiaiSession.on("error", error => console.log(error));
  apiaiSession.end();
};
