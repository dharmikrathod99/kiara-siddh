$shell = New-Object -COM Shell.Application
$folder = $shell.NameSpace("$PWD\src\videos")
$file = $folder.ParseName("1116 (1).mp4")
for ($i = 0; $i -lt 320; $i++) {
    $header = $folder.GetDetailsOf($null, $i)
    $val = $folder.GetDetailsOf($file, $i)
    if ($val) {
        Write-Host "$header ($i): $val"
    }
}
