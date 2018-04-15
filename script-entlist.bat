@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\.\script-entlist.cmd" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\.\script-entlist.cmd" %*
)