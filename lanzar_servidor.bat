@echo off
title Servidor IESE Case Experience
chcp 65001 > nul

echo ========================================================
echo        INICIANDO SERVIDOR IESE CASE EXPERIENCE
echo ========================================================
echo.
echo [1/2] Abriendo el simulador en tu navegador por defecto...
start http://localhost:8765/index.html
echo.
echo [2/2] Iniciando servidor web local sin cache (-c-1)...
echo.
echo Nota: Si realizas cambios en los vídeos o tiempos,
echo solo recarga la página (F5) para verlos aplicados.
echo Deja esta ventana abierta mientras uses la aplicación.
echo.
echo Presiona Ctrl+C en esta ventana para detener el servidor.
echo --------------------------------------------------------
npx -y http-server -p 8765 -c-1
pause
