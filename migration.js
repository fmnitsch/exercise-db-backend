const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite')

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Exercise`)
    db.run(`CREATE TABLE IF NOT EXISTS Exercise
    (id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    muscles TEXT NOT NULL,
    description TEXT NOT NULL,
    level INTEGER NOT NULL,
    video_link TEXT NOT NULL )`)
});