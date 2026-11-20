// TODO (Member B): create the database tables. Run with: npm run migrate
//   users:        id, name, email (unique), password_hash, role ('admin' | 'employer' | 'candidate')
//   jobs:         id, employer_id (-> users), title, company, location, description
//   applications: id, job_id (-> jobs), candidate_id (-> users), cover_letter
// Tell Member A when the users table is ready (A needs it for register/login).
// Later schema changes: DON'T edit this file, create a new one: npx knex migrate:make name
exports.up = async (knex) => {};
exports.down = async (knex) => {};
