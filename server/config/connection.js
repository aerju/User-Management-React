const MongoClient=require('mongodb').MongoClient
const state={
    db:null
}

module.exports.connect=function(done){
    const url="mongodb+srv://42arju:arju123@cluster2.8zoozo7.mongodb.net/"
    const dbname='Usermanagement'

    MongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbname)
        done()
    })
}

module.exports.get=function(){
    return state.db;
}