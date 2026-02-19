import { Database } from 'bun:sqlite';

const db = new Database('project_mgmt.sqlite');

// Enable Foreign Keys for cascading deletes
db.exec('PRAGMA foreign_keys = ON;');

// Load and execute schema
const schema = await Bun.file('schema.sql').text();
db.exec(schema);

export default db;
