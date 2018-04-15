@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\.\node_modules\entlist\bin\entlist.cmd" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\.\node_modules\entlist\bin\entlist.cmd" %*
)