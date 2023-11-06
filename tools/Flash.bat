cd /d "%~dp0"
bin\esptool.exe  --chip esp32h2 --baud 921600 write_flash 0x10000 firmware\ESP_ZIGBEE_CO2.bin
pause