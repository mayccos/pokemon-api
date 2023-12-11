const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')

let sequelize

if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(
        'l2099s32g14tcg80',
        'eef8bi16gea5fxm0',
        'qy11ujver9xfeyhj',
        {
            host: 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            dialect: 'mariadb',
            port: '3306',
            dialectOptions: {
                timezone: 'Etc/GMT-2',
            },
            logging: false,
        },
    )
} else {
    sequelize = new Sequelize('pokedex', 'root', '', {
        host: 'localhost',
        port: '3307',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2',
        },
        logging: false,
    })
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({ force: true }).then((_) => {
        /*pokemons.map((pokemon) => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types,
            }).then((pokemon) => console.log(pokemon.toJSON()))
        })*/

        bcrypt
            .hash('pikachu', 10)
            .then((hash) =>
                User.create({
                    nom: 'Becker',
                    prenom: 'Jean-Christophe',
                    pseudo: 'mayccos',
                    password: hash,
                    email: 'mothos@hotmail.fr',
                }),
            )
            .then((user) => console.log(user.toJSON()))

        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb,
    Pokemon,
    User,
}
