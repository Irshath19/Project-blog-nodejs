const express=require('express');
const router=express.Router();
const Post=require('../models/Post');

// const data=await Post.find();
router.get('',async (req,res)=>{
    // res.send("Hello world");
    try{
        const locals={
            title:"Node js blog",
            description:"Simple blog created with node js"
        }
        let perPage=10;
        let page=req.query.page || 1;

        const data=await Post.aggregate([{$sort :{createdAt :-1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        // const count =await Post.count();
        const count = await Post.countDocuments({});
        const nextPage=parseInt(page) + 1;
        const hasNextPage =nextPage <= Math.ceil(count/perPage);






        res.render('index',{locals,
            data,
            current :page,
        nextPage :hasNextPage ? nextPage:null,
        currentRoute:'/'
       });
    }catch(err)
    {
    console.log(err);
    }
});


router.get('/post/:id', async (req, res) => {
    try {
      let slug = req.params.id;
  
      const data = await Post.findById({ _id: slug });
  
      const locals = {
        title: data.title,
        description: "Simple Blog created with NodeJs, Express & MongoDb.",
        currentRoute:`post/${slug}`
      }
  
      res.render('post', { 
        locals,
        data,
        currentRoute: `/post/${slug}`
      });
    } catch (error) {
      console.log(error);
    }
  
  });


  router.post('/search', async (req, res) => {
    try {
      const locals = {
        title: "Seach",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      let searchTerm = req.body.searchTerm;
    //   console.log(searchTerm);
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
  
      const data = await Post.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
          { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
      });
  
      res.render("search", {
        data,
        locals,
        currentRoute: '/'
      });
    } catch (error) {
      console.log(error);
    }
  
  });
  


router.get('/about',(req,res)=>{
    // res.send("Hello world");
    res.render('about',{
      currentRoute:'/about'
    });
});
router.get('/contact',(req,res)=>{
    // res.send("Hello world");
    res.render('contact',{
      currentRoute:'/contact'
    });
});

module.exports=router;