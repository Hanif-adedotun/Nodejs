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
            uniqueID : 'uniqueid'
        }
    },
    
    User:{
        dbname: null,
        fulldetails: []
    },
    google:{
        
        clientID: "135774644582-1etfavodc0ic3a8nqhj919o29gco6utj.apps.googleusercontent.com",
        // '135774644582-r6a0dsdvqlmpgt86vohomiim9sq9dfhi.apps.googleusercontent.com',
        clientSecret: "SuVfzF7J2bK2LwNX4FdwB_nv"
        // 'HoY2U5REcwG1ZkG1gXYXcbsI'
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
    }
};