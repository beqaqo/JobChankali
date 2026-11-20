# JobChankali

React (frontend) + Express (backend) + SQLite (database). User roles: **admin**, **employer**, **candidate**.

## Team roles
| Member | Responsibility | Main places |
|--------|----------------|-------------|
| **A** | Authentication and roles | `middleware/auth.js`, `authController.js`, `routes/auth.js`, `seeds/`, `AuthContext.js`, `ProtectedRoute.js`, `Login.js` / `Register.js` logic |
| **B** | Database and CRUD | `knexfile.js`, `config/db.js`, `migrations/`, `models/`, `jobController.js`, `applicationController.js`, `services/api.js` (job functions) |
| **C** | Figma design and interface | `styles/`, `components/`, design of every page in `pages/` |

Every file contains `TODO (Member X)` comments.

## Folder structure
```
backend/
  server.js         starts the server (already works)
  routes/           URLs
  controllers/      what each URL does
  models/           database queries
  middleware/       login/role check, validation
  migrations/       database tables
  seeds/            first admin user
  config/db.js      database connection
frontend/src/
  pages/            one file per page
  components/       reusable UI parts
  services/api.js   calls to the backend
  context/          logged-in user state
  styles/           CSS
  App.js            page routes
```

## Run it (Node.js 18+)
Backend (http://localhost:5000):
```bash
cd backend
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm run dev
```
Check: open http://localhost:5000/api/health. Unfinished endpoints answer `501 Not implemented yet`.

Frontend (http://localhost:3000), in a second terminal:
```bash
cd frontend
npm install
npm start
```
Packages for everything (bcryptjs, jsonwebtoken, knex, sqlite3) are already in `package.json`.

## Suggested order of work
1. **B** creates the tables and models (A and C depend on this).
2. **A** builds register/login + role middleware. **B** builds job CRUD.
3. **C** designs in Figma first, then implements the pages/components; A and B connect the logic.
4. Everyone tests the whole flow together.
