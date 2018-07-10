# Build production
ng build

$filePath = "HackerNewsChallenge.zip"
If (Test-Path $filePath){ Remove-Item $filePath }

#Create Zip
Compress-Archive -Path dist\* -DestinationPath $filePath

#Publish
$username = Read-Host -Prompt 'Username'
$password = Read-Host -Prompt 'Password' 
$apiUrl = "https://hackernewschallenge.scm.azurewebsites.net/api/zipdeploy"
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $username, $password)))
$userAgent = "powershell/1.0"
Invoke-RestMethod -Uri $apiUrl -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -UserAgent $userAgent -Method POST -InFile $filePath -ContentType "multipart/form-data"

