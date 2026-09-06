# Hrm

Solution product theo **Jarvis** (ProjectReference local — không NuGet).

| Thư mục | Vai trò |
|---------|---------|
| `backend/` | Clean Architecture 5 layer — Host + Swagger + OTEL + Healthcheck + CORS |
| `frontend/` | Vite + React SPA — Jarvis `@jarvis/core` (dev `:5173`, proxy API) |
| `autotest/` | Playwright — API + UI |
| `unittest/` | xUnit — Domain / Application |
| `Hrm.sln` | Solution duy nhất (backend + unittest) |

Jarvis source: `../jarvis/frameworks/` (ProjectReference).

## Chạy nhanh

```powershell
# Backend
dotnet run --project backend/Hrm.Host --launch-profile http

# Frontend (Jarvis AdminLayout — demo: admin@gmail.com / Admin@123)
cd frontend; npm install; npm run dev

# Unit test
dotnet test Hrm.sln

# Autotest (cần backend + frontend đang chạy)
cd autotest; npm install; npx playwright install chromium
npm run test:api
npm run test:ui
```
