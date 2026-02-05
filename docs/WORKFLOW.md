# ProjectAdd – Dev / Test Workflow

This repo is meant to be **self-hostable** and easy to move between servers.

## 0) Prereqs
- Node 24+
- pnpm

## 1) Install
```powershell
cd C:\Users\dan\.openclaw\workspace\project-add
pnpm install
```

## 2) Configure environment
Create `.env.local` (do **not** commit it):
```dotenv
GITHUB_TOKEN=...
PROJECTADD_REPOS=owner1/repo1,owner2/repo2
```

## 3) Run dev server (LAN-accessible)
Next dev must bind to 0.0.0.0:
```powershell
cd C:\Users\dan\.openclaw\workspace\project-add
node node_modules\next\dist\bin\next dev -H 0.0.0.0 -p 3000
```

Expected URLs:
- Local: http://localhost:3000
- LAN:   http://<LAN-IP>:3000

## 4) Test connectivity (from the host)
### Check listener
```powershell
netstat -ano | findstr :3000
```

### HTTP check
```powershell
(Invoke-WebRequest http://127.0.0.1:3000 -UseBasicParsing).StatusCode
```

### TCP check
```powershell
Test-NetConnection 127.0.0.1 -Port 3000
Test-NetConnection <LAN-IP> -Port 3000
```

## 5) Test connectivity (from another machine on LAN)
```powershell
Test-NetConnection <LAN-IP> -Port 3000
Invoke-WebRequest http://<LAN-IP>:3000 -UseBasicParsing
```

## 6) If LAN access fails: Windows Firewall
If localhost works but another machine can’t connect, add an inbound allow rule for TCP 3000.

Command (admin PowerShell):
```powershell
netsh advfirewall firewall add rule name="ProjectAdd dev 3000" dir=in action=allow protocol=TCP localport=3000
```

To remove:
```powershell
netsh advfirewall firewall delete rule name="ProjectAdd dev 3000"
```

## 7) Build + run (production-ish)
```powershell
pnpm build
pnpm start
```

## 8) Docker (portable)
```powershell
docker compose build
docker compose up -d
```
