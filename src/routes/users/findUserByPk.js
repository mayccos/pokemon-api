const { User } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.get('/api/users/:id', auth, (req, res) => {
        User.findByPk(req.params.id)
            .then((user) => {
                if (user === null) {
                    const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`
                    return res.status(404).json({ message })
                }

                const message = 'Un utilisateur a bien été trouvé.'
                res.json({ message, data: user })
            })
            .catch((error) => {
                const message = `L'utilisateur n'a pas pu être récupéré. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
    })
}
