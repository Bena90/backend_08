const mariaDBConf = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        database: 'ecommerce'
    },
    pool:{ min: 1, max: 8 }
}

export default mariaDBConf;