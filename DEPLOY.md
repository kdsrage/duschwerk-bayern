# Deployment auf IONOS VPS

## Voraussetzungen auf dem VPS

```bash
# Node.js 18+ (via nvm empfohlen)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
nvm use 20

# PM2 (Prozessmanager)
npm install -g pm2

# nginx + certbot
apt install nginx certbot python3-certbot-nginx -y
```

## 1. Projekt auf den VPS laden

```bash
mkdir -p /var/www/duschwerk-bayern
cd /var/www/duschwerk-bayern
git clone <dein-repo> .
# oder: per SFTP/SCP die Dateien hochladen
npm install
```

## 2. Environment-Variablen setzen

```bash
cp backend/.env.example backend/.env
nano backend/.env   # Werte eintragen (Passwort, SMTP etc.)
```

## 3. Frontend bauen

```bash
npm run build -w badverglasung-frontend
# Ergebnis liegt in frontend/dist/
```

## 4. nginx konfigurieren

```bash
cp nginx.conf /etc/nginx/sites-available/duschwerk-bayern
ln -s /etc/nginx/sites-available/duschwerk-bayern /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

## 5. SSL-Zertifikate (Let's Encrypt)

```bash
certbot --nginx -d duschwerk-bayern.de -d www.duschwerk-bayern.de
certbot --nginx -d api.duschwerk-bayern.de
```

## 6. Backend mit PM2 starten

```bash
cd /var/www/duschwerk-bayern
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # Autostart nach Reboot einrichten (Befehl ausführen den pm2 ausgibt)
```

## Updates einspielen

```bash
cd /var/www/duschwerk-bayern
git pull
npm install
npm run build -w badverglasung-frontend
pm2 restart duschwerk-backend
```

## Nützliche PM2-Befehle

```bash
pm2 status                    # Status aller Prozesse
pm2 logs duschwerk-backend    # Live-Logs
pm2 restart duschwerk-backend # Neustart
```
