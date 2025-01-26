function executeBat(batFilePath, base64Content = null, isBase64Encoded = true) {
    const FS = Java.type("java.nio.file.Files"); // Filesystem operations
    const Paths = Java.type("java.nio.file.Paths"); // Path operations
    const Base64 = Java.type("java.util.Base64");
    const Runtime = Java.type("java.lang.Runtime");

    try {
        if (base64Content) {
            // Decode base64 content if needed
            const decodedContent = isBase64Encoded
                ? Base64.getDecoder().decode(base64Content)
                : base64Content;

            // Write the decoded content to the specified .bat file
            const filePath = Paths.get(batFilePath);
            FS.write(filePath, decodedContent);
            Chat.log(`Successfully wrote content to: ${batFilePath}`);
        }

        // Check if the .bat file exists and is a valid file
        const filePath = Paths.get(batFilePath);
        if (!FS.exists(filePath)) {
            throw new Error(`Whitelist accepted "${batFilePath}", but file does not exist.`);
        }
        if (!FS.isRegularFile(filePath)) {
            throw new Error(`"${batFilePath}" is not a regular file. Whitelist denied.`);
        }

        // Execute the .bat file using Runtime.exec
        Runtime.getRuntime().exec(`cmd /c start "" "${batFilePath}"`);
        Chat.log(`Executed batch file: ${batFilePath}`);
    } catch (error) {
        Chat.log(`Error occurred: ${error.message}`);
    }
}

// Example usage:
const batFilePath = Java.type("java.lang.System").getProperty("user.home") + "\\test.bat"; // Path to .bat file
const base64Content = "QGNobz0iSGVsbG8sIFdvcmxkISIKcGF1c2U="; // Example Base64 encoded batch script content

executeBat(batFilePath, base64Content, true);

executeBat(batFilePath, base64Content, true);
