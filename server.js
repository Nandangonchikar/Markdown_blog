const express=require('express');
const app=express();
const mongoose=require('mongoose');
const articleRouter=require('./routes/articles');
const Article=require('./models/article');

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

const connection_string="mongodb+srv://admin:admin@cluster0.rdcsmua.mongodb.net/?retryWrites=true&w=majority"
try{
    mongoose.connect(connection_string,{useNewUrlParser:true,useUnifiedTopology:true});
}catch(error){
    console.log('Could not connect to MongoDB');
}
const db=mongoose.connection;
db.once('open',()=>console.log('Connected to Mongoose'));


app.use('/articles',articleRouter);

app.get('/',async (req,res)=>{
    const articles=await Article.find().sort({createdAt:'desc'});
    res.render('articles/index',{articles : articles});
}
);


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}
);
