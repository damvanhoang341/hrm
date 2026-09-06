# Hrm frontend

Host SPA theo Jarvis (`@jarvis/core` + `AdminLayout`), cùng pattern `Sample/clients/web`.

## Chạy

```powershell
cd frontend
npm install
npm run dev
```

- App: `http://127.0.0.1:5173`
- Proxy `/api`, `/health`, `/swagger` → backend `:5167`
- Demo login: `admin@gmail.com` / `Admin@123` (không cần BE)

Lần đầu `npm run build` sẽ cài/build `@jarvis/core` nếu chưa có `dist`.

## Build

```powershell
npm run build
```

Output → `backend/Hrm.Host/wwwroot` (ASP.NET `UseCoreSpa`).
