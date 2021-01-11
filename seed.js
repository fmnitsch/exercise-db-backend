const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite')

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Exercise'", (error, table) => {
    if (error) {
      throw new Error(error);
    } 

    if(table) {
        db.serialize(() => {
            db.run(`INSERT INTO Exercise
            (name, muscles, description, level, video_link)
            VALUES ("walking lunge", "legs", "it's a walking lunge", 3, "XYKmtTusJFs");`);
            db.run(`INSERT INTO Exercise
            (name, muscles, description, level,video_link)
            VALUES ("curl", "arms", "it's a curl", 1, "zs618MVIsG4");`);
            db.run(`INSERT INTO Exercise
            (name, muscles, description, level,video_link)
            VALUES ("reverse lunge", "legs", "it's a reverse lunge", 2, "0UddCs5zVGA");`);
            db.run(`INSERT INTO Exercise
            (name, muscles, description, level,video_link)
            VALUES ("shoulder tap", "core,", "it's a shoulder tap", 2, "foDRu3-GQa8");`);
            db.run(`INSERT INTO Exercise
            (name, muscles, description, level,video_link)
            VALUES ("push-up + shoulder tap", "core, full-body", "it's a push-up + shoulder tap", 2, "KnY6tGD_zXo");`);
            db.run(`INSERT INTO Exercise
            (name, muscles, description, level,video_link)
            VALUES ("cossack squat", "legs", "it's a cossack squat", 3, "0JME7tcREEU");`);
        })
    }
});


