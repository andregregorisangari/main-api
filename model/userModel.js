const db = require("./db");

const User = function (user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
};

User.createUser = (newUser, result) => {
    db.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { ...newUser });
        result(null, { ...newUser });
    });
};

User.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE email='${email}'`, (err, res) => {
            if (err) {
                return reject(err);
            }
            if (res.length) {
                console.log("found user: ", res[0]);
                return resolve({
                    kind: "found",
                    username: res[0].username,
                    password: res[0].password,
                    email: res[0].email,
                });
            }
            return resolve({ kind: "not_found" });
        });
    });
};

User.findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE username='${username}'`, (err, res) => {
            if (err) {
                return reject(err);
            }
            if (res.length) {
                console.log("found user: ", res[0]);
                return resolve({
                    kind: "found",
                    username: res[0].username,
                    password: res[0].password,
                    email: res[0].email,
                });
            }
            return resolve({ kind: "not_found" });
        });
    });
};

User.findById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE id='${id}'`, (err, res) => {
            if (err) {
                return reject(err);
            }
            if (res.length) {
                console.log("found user: ", res[0]);
                return resolve({
                    kind: "found",
                    id: res[0].id,
                    username: res[0].username,
                    password: res[0].password,
                    email: res[0].email,
                });
            }
            return resolve({ kind: "not_found" });
        });
    });
};

User.updateUser = (id, updatedUser) => {
    delete updatedUser.kind;

    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id], (err, res) => {
            if (err) {
                return reject(err);
            }
            if (res.affectedRows > 0) {
                console.log("updated user: ", updatedUser);
                return resolve(updatedUser);
            } else {
                return resolve({ kind: "not_found" });
            }
        });
    });
};


User.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
            if (err) {
                return reject(err);
            }
            if (res.affectedRows > 0) {
                console.log("deleted user with id: ", id);
                return resolve({ kind: "deleted" });
            } else {
                return resolve({ kind: "not_found" });
            }
        });
    });
};



module.exports = User;
