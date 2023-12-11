const { User } = require('../../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../../auth/auth')

const capitalize = (str) => str.charAt(0).toUpperCase() + str.substring(1)

module.exports = (app) => {
    app.get('/api/users', auth, (req, res) => {
        if (req.query.name) {
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            if (name.length < 2) {
                const message = `Le terme de recherche doit contenir au minimum 2 caractères.`
                return res.status(400).json({ message })
            }

            return user
                .findAndCountAll({
                    where: {
                        name: {
                            [Op.or]: {
                                [Op.like]: `%${name}%`,
                                [Op.startsWith]: capitalize(name),
                            },
                        },
                    },
                    order: ['name'],
                    limit: limit,
                })
                .then(({ count, rows }) => {
                    const message = `Il y a ${count} qui correspondent au terme de recherche ${name}.`
                    return res.json({ message, data: rows })
                })
        } else {
            User.findAll({ order: ['name'] })
                .then((users) => {
                    const message =
                        'La liste des utilisateurs a bien été récupéré.'
                    res.json({ message, data: users })
                })
                .catch((error) => {
                    const message = `La liste des utilisateurs n'a pas pu être récupéré. 
                         Réessayez dans quelques instants.`
                    res.status(500).json({ message, data: error })
                })
        }
    })
}
