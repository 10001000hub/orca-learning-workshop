<#
.SYNOPSIS
    curriculum配下の教材ディレクトリの整合性を検証する初期版スクリプト。
.DESCRIPTION
    curriculum/<theme>/<ID>/ ごとに、必須ファイル（metadata.yaml, lesson.md, quiz.json,
    workshop.json, references.md）の存在、metadata.yaml内の必須キー
    （id, title, os, status, learning_objective）の有無とosがWindowsのみであること、
    quiz.json/workshop.jsonがJSONとして妥当か、quiz.jsonの各answerがchoicesに実在するか、
    workshop.jsonの各success_checkが空でないかを確認する。
.PARAMETER CurriculumPath
    検証対象の curriculum ディレクトリ。省略時はこのスクリプトから見た ../curriculum。
.EXAMPLE
    powershell -File scripts\validate-curriculum.ps1
#>

param(
    [string]$CurriculumPath = (Join-Path $PSScriptRoot "..\curriculum")
)

$ErrorActionPreference = "Stop"
$script:exitCode = 0

$requiredFiles = @("metadata.yaml", "lesson.md", "quiz.json", "workshop.json", "references.md")
$requiredMetadataKeys = @("id", "title", "os", "status", "learning_objective")

function Write-Result {
    param(
        [bool]$Ok,
        [string]$Message
    )
    if ($Ok) {
        Write-Host "[OK] $Message" -ForegroundColor Green
    }
    else {
        Write-Host "[NG] $Message" -ForegroundColor Red
        $script:exitCode = 1
    }
}

if (-not (Test-Path $CurriculumPath)) {
    Write-Host "curriculum ディレクトリが見つかりません: $CurriculumPath" -ForegroundColor Red
    exit 1
}

$lessonDirs = Get-ChildItem -Path $CurriculumPath -Directory -Recurse |
    Where-Object { Test-Path (Join-Path $_.FullName "metadata.yaml") }

if (-not $lessonDirs -or $lessonDirs.Count -eq 0) {
    Write-Host "検証対象の教材ディレクトリ（metadata.yamlを含むディレクトリ）が見つかりませんでした。" -ForegroundColor Yellow
    exit 1
}

foreach ($dir in $lessonDirs) {
    Write-Host ""
    Write-Host "=== $($dir.FullName) ===" -ForegroundColor Cyan

    foreach ($file in $requiredFiles) {
        $path = Join-Path $dir.FullName $file
        Write-Result (Test-Path $path) "$file が存在する"
    }

    $metadataPath = Join-Path $dir.FullName "metadata.yaml"
    if (Test-Path $metadataPath) {
        $metadataContent = Get-Content -Path $metadataPath -Raw -Encoding UTF8
        foreach ($key in $requiredMetadataKeys) {
            $pattern = "(?m)^\s*$([regex]::Escape($key))\s*:"
            $found = [regex]::IsMatch($metadataContent, $pattern)
            Write-Result $found "metadata.yaml に '$key' キーがある"
        }

        # no_mac_instruction veto条件の機械的裏付け: os配下にWindows以外の値がないか確認する。
        $osMatch = [regex]::Match($metadataContent, "(?ms)^os:[ \t]*\r?\n((?:^[ \t]+-[^\r\n]*\r?\n?)+)")
        if ($osMatch.Success) {
            $osValues = $osMatch.Groups[1].Value -split '\r?\n' |
                Where-Object { $_.Trim() -match "^-" } |
                ForEach-Object { ($_ -replace '^[ \t]*-[ \t]*', '').Trim() }
            $nonWindows = $osValues | Where-Object { $_ -ne "Windows" }
            Write-Result ($nonWindows.Count -eq 0) "metadata.yaml: os にWindows以外の値がない（現在値: $($osValues -join ', ')）"
        }
    }

    $quizPath = Join-Path $dir.FullName "quiz.json"
    if (Test-Path $quizPath) {
        try {
            $quiz = Get-Content -Path $quizPath -Raw -Encoding UTF8 | ConvertFrom-Json
            Write-Result $true "quiz.json はJSONとして妥当"
            foreach ($q in $quiz.questions) {
                # 正答が一意かどうかの意味的判断はeval-loop側の役割。ここでは
                # answerフィールドがchoicesに実在するかという構造的整合性のみを見る。
                $choiceIds = @($q.choices | ForEach-Object { $_.id })
                $answerExists = $choiceIds -contains $q.answer
                Write-Result $answerExists "quiz.json: $($q.id) の answer('$($q.answer)') が choices に存在する"
            }
        }
        catch {
            Write-Result $false "quiz.json はJSONとして妥当（エラー: $($_.Exception.Message)）"
        }
    }

    $workshopPath = Join-Path $dir.FullName "workshop.json"
    if (Test-Path $workshopPath) {
        try {
            $workshop = Get-Content -Path $workshopPath -Raw -Encoding UTF8 | ConvertFrom-Json
            Write-Result $true "workshop.json はJSONとして妥当"
            foreach ($step in $workshop.steps) {
                # success_checkの曖昧さ自体の判断はeval-loop側の役割。ここでは
                # 空でないことだけを機械的に確認する。
                $hasCheck = -not [string]::IsNullOrWhiteSpace($step.success_check)
                Write-Result $hasCheck "workshop.json: $($step.id) の success_check が空でない"
            }
        }
        catch {
            Write-Result $false "workshop.json はJSONとして妥当（エラー: $($_.Exception.Message)）"
        }
    }
}

Write-Host ""
if ($script:exitCode -eq 0) {
    Write-Host "すべての検証に合格しました。" -ForegroundColor Green
}
else {
    Write-Host "検証に失敗した項目があります。" -ForegroundColor Red
}

exit $script:exitCode
