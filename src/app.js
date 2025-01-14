const express = require ('express');

const connectdb = require('./config/database');

const app = express();

const User = require('./models/user');

app.use(express.json());

app.post("/signup", async(req,res)=>{
    //Creating a new instance of the User model
  const user = new User(req.body);

  await user.save();
  res.send("User Added Successfully !!!");
});

// get user by email

app.get("/user", async (req,res)=>{
  const userEmail = req.body.emailId;

  try{
    const user = await User.find({emailId : userEmail})
    if(!user){
      res.status(404).send("User not found");
    }else{
      res.send(user);
    }
  } catch {
    res.status(404).send("something went wrong")
  }

});

app.get("/feed",async(req,res)=>{
  try{
  const user = await User.find()
  if(!user){
    res.status(404).send("User Not found");
  }else{
    res.send(user);
  }
  }
  catch(err){
    res.status(404).send("something went wrong")
  }
});

app.delete("/user",async (req,res)=>{
  const userId = req.body.userId;
  try{
  const user = await User.findByIdAndDelete({_id: userId});
  if(!user){
    res.status(404).send("User not found")
  }else{
    res.send("User deleted successfully");
  }
  }
  catch(err){
  res.status(404).send("Something went wrong " + err.message)
  }
});

// app.patch("/user",async (req,res)=>{
//   const userId = req.body.userId;
//   const data = req.body;

  app.patch("/user/:userId",async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

  try{

    const Allowed_Update=["password","gender","age","photoUrl","about","skills"];
    const isUpdatedAllowed = Object.keys(data).every((k)=>Allowed_Update.includes(k));
    if(!isUpdatedAllowed){
      throw new Error("Updates not allowed")
    }
    if(data.length && data?.skills.length > 10){
      throw new Error("skills cannot be more than 10")
    }

  const user = await User.findByIdAndUpdate({_id: userId},data,{returnDocument:"after",runValidators:true});
  res.send("User updated succesfully");
  }
  catch(err){
  res.status(404).send("Something went wrong " + err.message)
  }
})

connectdb()
.then(() => {
    console.log("coonection to database is successful");
    app.listen(3000,()=> {
        console.log("Server is listening to port 3000");
        })    
})
.catch((err)=>{
console.error("coonection to database failed");
});



// app.use("/",(req,res)=>{
//     res.send("Hello world");
// })


// app.use("/hello/2",(req,res)=>{
// res.send("hello hello hello");

// })

// app.use("/hello",(req,res)=>{
//     res.send("Hola");
// })
 

// ======

// app.use("/test",
//     (req,res,next)=>{
//     // res.send("hello hi");
//     console.log("001");
//     next ();
// },
//    (req,res,next)=>{
//     // res.send("hello 2");
//     console.log("002");
//     next();
// },
// (req,res,next)=>{
//     // res.send("hello 3");
//     console.log("003");
//     next();
// },
// (req,res,next)=>{
//      res.send("hello 4");
//      console.log("004");
//     // next(); }
// }
// );

