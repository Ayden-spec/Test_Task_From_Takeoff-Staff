const Routes = require('express');
const mysqls = require('../modules/mysql')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const authMidleware = require('./auth.midleware')
const router = new Routes();

router.post('/registration',
    [
        check('email', 'Некорректный email.').isEmail(),
        check('password', 'Длина пароля должна быть не менее 6 символов.').isLength({ min: 6, max: 15 })
    ], async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return (res.status(400).json({ message: 'Uncorrect request', errors }))
            }
            const { email, password, name } = req.body
            const hashPass = await bcrypt.hash(password, 5);
            mysqls.executeQuery(`SELECT * FROM users WHERE email = '${email}' LIMIT 1`, function (err, rows, fields) {
                if (err) {
                    console.log('[DATABASE | ERROR] ' + err);
                    return;
                }

                if (rows.length === 0) {
                    let sql = "INSERT INTO users (email, name, password) VALUES ('" + email + "', '" + name + "', '" + hashPass + "')";
                    mysqls.executeQuery(sql)
                    res.send("Вы успешно зарегестрировались.")
                } else if (rows[0].email === email) {
                    res.status(400).json({ message: "Данный email: " + email + " занят." })
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ message: "server error" })
        }
    })


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        mysqls.executeQuery(`SELECT * FROM users WHERE email = '${email}' LIMIT 1`, function (err, rows, fields) {
            if (err) {
                console.log('[DATABASE | ERROR] ' + err);
                return;
            }

            if (rows.length === 0) {
                return res.status(400).send({ message: "Пользователь не найден." })
            }

            if (!bcrypt.compareSync(password, rows[0].password)) {
                return res.status(400).json({ message: "Неправильный пароль или логин." })
            }

            const token = jwt.sign({ id: rows[0].id }, config.get("secret_key"), { expiresIn: "1h" })
            return res.json({
                token,
                user: {
                    id: rows[0].id,
                    email: rows[0].email
                }
            })
        });
    } catch (e) {
        console.log(e);
        res.send({ message: "server error" })
    }
})

router.get('/auth', authMidleware, async (req, res) => {
    try {
        mysqls.executeQuery(`SELECT * FROM users WHERE id = '${req.user.id}' LIMIT 1`, function (err, rows, fields) {
            if (err) {
                console.log('[DATABASE | ERROR] ' + err);
                return;
            }
            if (rows.length === 0) {
                return res.status(400).json({ message: "Пользователь не найден." })
            }
            const token = jwt.sign({ id: rows[0].id }, config.get("secret_key"), { expiresIn: "1h" })
            return res.json({
                token,
                user: {
                    id: rows[0].id,
                    email: rows[0].email
                }
            })
        });
    } catch (e) {
        console.log(e);
        res.send({ message: "server error" })
    }
})

router.get('/get-contacts', authMidleware, async (req, res) => {
    try {
        mysqls.executeQuery(`SELECT * FROM contacts WHERE user_id = '${req.user.id}' ORDER BY name`, function (err, rows, fields) {
            if (err) {
                console.log('[DATABASE | ERROR] ' + err);
                return;
            }
            if (rows.length === 0) {
                return res.status(400).json({ message: "Контактов нет." })
            }
            return res.json({
                contacts: rows
            })
        });
    } catch (e) {
        console.log(e);
        res.send({ message: "server error" })
    }
})

router.get('/get-contact/:id', authMidleware, async (req, res) => {
    try {
        mysqls.executeQuery(`SELECT * FROM contacts WHERE user_id = '${req.user.id}' AND contact_id = '${req.params.id}' LIMIT 1`, function (err, rows, fields) {
            if (err) {
                console.log('[DATABASE | ERROR] ' + err);
                return;
            }
            if (rows.length === 0) {
                return res.status(400).json({ message: "Контакт не найден." })
            }
            return res.json({
                contact: rows[0]
            })
        });
    } catch (e) {
        console.log(e);
        res.send({ message: "server error" })
    }
})


router.put('/put-contact/:id', authMidleware, async (req, res) => {
    try {
        mysqls.executeQuery(`SELECT * FROM contacts WHERE user_id = '${req.user.id}' AND contact_id = '${req.params.id}' LIMIT 1`, function (err, rows, fields) {
            if (err) {
                console.log('[DATABASE | ERROR] ' + err);
                return;
            }
            if (rows.length !== 0) {
                mysqls.executeQuery(`UPDATE contacts SET name='${req.body.name}', phone_number='${req.body.phone_number}', email='${req.body.email}', comment='${req.body.comment}' WHERE user_id = '${req.user.id}' AND contact_id = '${req.params.id}'`)
            }
            return res.json({ message: 'Успешно изменено.' })
        });
    } catch (e) {
        console.log(e);
        res.send({ message: "server error" })
    }
})

router.post('/post-contact', authMidleware, async (req, res) => {
    try {
        mysqls.executeQuery(`INSERT INTO contacts (user_id, name, phone_number, email, comment) 
        VALUES ('${req.user.id}', '${req.body.name}', '${req.body.phone_number}', '${req.body.email}', '${req.body.comment}')`)
        return res.json({ message: 'Успешно изменено.' })
    } catch (e) {
        console.log(e);
        res.send({ message: "server error" })
    }
})

router.delete('/delete-contact/:id', authMidleware, async (req, res) => {
    try {
        mysqls.executeQuery(`SELECT * FROM contacts WHERE user_id = '${req.user.id}' AND contact_id = '${req.params.id}' LIMIT 1`, function (err, rows, fields) {
            if (err) {
                console.log('[DATABASE | ERROR] ' + err);
                return;
            }
            if (rows.length !== 0) {
                mysqls.executeQuery(`DELETE FROM contacts WHERE user_id = '${req.user.id}' AND contact_id = '${req.params.id}'`)
            }
            return res.json({ message: 'Успешно изменено.' })
        });
    } catch (e) {
        console.log(e);
        res.send({ message: "server error" })
    }
})



module.exports = router;