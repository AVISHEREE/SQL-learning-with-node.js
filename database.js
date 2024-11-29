import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
}).promise();

//CREATE Query
// const query = await pool.query(`CREATE TABLE NOTES
//                                 (noteid INT NOT NULL AUTO_INCREMENT,
//                                 title varchar(255),
//                                 contents varchar(255),
//                                 created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                                 PRIMARY KEY (noteid));`);
// console.log(query);

//Function to SHOW Table notes
export async function getNotes() {
    const [rows] = await pool.query(`
        SELECT 
        * FROM 
        notes;`);
    return rows;
}

export async function getSingleNote(id){
    const [note] = await pool.query(`
        SELECT 
        * FROM notes 
        WHERE noteid= ?`,
        [id]);
    return note[0];
}

export const createNote = async (title,content) => {
    const [result] = await pool.query(`
        INSERT INTO 
        NOTES (title,contents)
        VALUES (?,?);
        `,[title,content]);
    return getSingleNote(result.insertId);
}

//ALTER(Rename) Table
// const query = await pool.query(`ALTER TABLE NOTES RENAME TO notes;`)
// console.log(query);

// const notes = await getNotes();
// console.log(notes);

// const note = await getSingleNote(3);
// console.log(note)

const createNoteResult = await createNote("test","testing");
console.log(createNoteResult)