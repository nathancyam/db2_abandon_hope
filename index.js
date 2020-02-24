const Knex = require('knex')
const Db2Dialect = require('knex-db2')

const knex = Knex({
    client: Db2Dialect,
    connection: {
        host: 'db',
        database: 'testdb',
        port: 50000,
        user: 'db2',
        password: 'password123',
        driver: '[IBM Cli Driver]',
        connectionStringParams: {
            ALLOWPROCCALLS: 1,
            CMT: 0
        }
    },
    pool: {
        min: 2,
        max: 10
    }
})

const query = knex
    .select('*')
    .from('table1')
    .where('x', 'y')

query
    .then(result => console.log(result))
    .catch(err => console.error(err))
    .finally(() => process.exit())