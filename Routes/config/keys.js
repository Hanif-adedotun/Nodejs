//This is the file that contains all the databse details and secret keys to mongodb
module.exports = {
    mysql:{
        host: 'localhost',
        username: 'hanif',
        password: 'hanif_mysql',
        //Dummy database
        database: 'haniduserdb',
         //Form table of the dashboard
        Table: {
            tablename: 'userTable',
            url: 'url',
            nameoftable: 'Tablename',
            uniqueID : 'uniqueid',
            userID: 'UserID'
        }
    },
    
    User:{
        dbname: null,
        fulldetails: []
    },
    google:{
        clientID: "135774644582-1etfavodc0ic3a8nqhj919o29gco6utj.apps.googleusercontent.com",
        clientSecret: "SuVfzF7J2bK2LwNX4FdwB_nv"
   
    },
    mongodb:{
        username: 'vm_admin',
        password: '3gPHRTsfrHtnwkE',
        url: 'mongodb://vm_admin:3gPHRTsfrHtnwkE@voltex-middlewear-shard-00-00.0qmeb.gcp.mongodb.net:27017,voltex-middlewear-shard-00-01.0qmeb.gcp.mongodb.net:27017,voltex-middlewear-shard-00-02.0qmeb.gcp.mongodb.net:27017/Vm_user>?ssl=true&replicaSet=atlas-57hqa1-shard-0&authSource=admin&retryWrites=true&w=majority',
        db:{
            name: "Vm_user",
            collection: 'Userdb'
        }
    },
    session:{
        cookieKey: 'uuysysuhh17872'
    },
    backend:{
        path: 'http://localhost:8080/api/middlewear/data'
    },
    email:{
        user: 'voltex.designs@outlook.com',
        password: 'voltex-4104'
    }
};