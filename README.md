# IBot-WhatsApp
IBot-WhatsApp adalah sebuah bot whatsapp, yang bertujuan mempermudah anda untuk mencari informasi atau layanan lainnya.
IBot-Whatsapp menggunakan library [whatsapp-web.js](https://wwebjs.dev/) yang berjalan menggunakan Puppeteer. Dan library [whatsapp-web.js](https://wwebjs.dev/) tersebut tidak berafiliasi, terkait, diotorisasi, maupun didukung oleh dengan cara apapun yang secara resmi terhubung dengan [WhatsApp](https://www.whatsapp.com/).

## Panduan Instalasi
Untuk bagi yang menggunakan Linux Ubuntu :
1. Agar penginstalan paket bekerja, silahkan ketik perintah :
```
apt update && apt upgrade
```
2. Install dependencies nya, ketik perintah :
```
sudo apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
3. Install FFMPEG untuk kebutuhan fitur IBot-WhatsApp, ketik perintah :
```
sudo apt-get install ffmpeg -y
```
4. Install CURL untuk kebutuhan upgrade versi nodejs & lainnya ketik perintah :
```
apt install curl
```
5. Untuk install nodejs silahkan ketik perintah :
```
apt install nodejs
```
6. Cek versi nodejs kamu, dengan ketik perintah :
```
node -v
```
7. Jika versi nodejs kamu dibawah v20.10.0 silahkan upgrade versinya, untuk mendapatkan versi nodejs v20.10.0 lts kamu bisa jalankan perintah :
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
8. Agar perintah nvm bisa digunakan ketik perintah :
```
source ~/.bashrc
```
9. Untuk install nodejs v20.10.0 LTS nya, ketik perintah :
```
nvm install v20.10.0
```
10. Install git untuk mengambil source pada bot-whatsapp, ketik perintah :
```
apt install git
```
11. Untuk mengambil source bot-whatsapp nya, ketik perintah :
```
git clone https://github.com/Fahreja-Dev/IBot-WhatsApp
```
12. Untuk menuju direktori bot nya, ketik perintah :
```
cd IBot-WhatsApp
```
13. Agar npm nya bisa kita gunakan, ketik perintah :
```
apt install npm
```
14. Untuk install module untuk kebutuhan bot-whatsapp nya, ketik perintah :
```
npm install
```
15. Untuk menjalankan bot nya, silahkan ketik perintah :
```
npm start
```
16. Scan kode QR pada whatsapp yang mau dijadikan bot-whatsapp

## Fitur

Fitur yang tersedia pada IBot-WhatsApp

| Fitur                 |Tersedia          |
| ----------------------|------------------|
| OpenAI                |:white_check_mark:|
| GeminiAI              |:white_check_mark:|
| ImageGeminiAI         |:white_check_mark:|
| Image convert Sticker |:white_check_mark:|
| Video convert Sticker |:white_check_mark:|
| Youtube convert MP3   |:white_check_mark:|
| Youtube convert MP4   |:x:               |


## Multi API
![Multi-API](https://github.com/Fahreja-Dev/IBot-WhatsApp/assets/144447615/119c3afb-8c09-451e-9757-7e8cbe8653b6)
Multi API berfungsi untuk meminimalisirkan terjadinya limit pada API yang kalian gunakan, dan berjalan secara berurutan.
