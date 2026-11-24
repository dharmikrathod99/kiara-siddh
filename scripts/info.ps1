$shell = New-Object -COM Shell.Application
$folder = $shell.NameSpace("$PWD\public\videos")
$file = $folder.ParseName("background-video.mp4")
for ($i = 0; $i -lt 320; $i++) {
    $header = $folder.GetDetailsOf($null, $i)
    $val = $folder.GetDetailsOf($file, $i)
    if ($val) {
        Write-Host "$header ($i): $val"
    }
}
