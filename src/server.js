require("express-async-errors")
const express = require("express");
const appError = require("./utils/AppError")

const routes = require("./routes")
const app = express();
app.use(express.json())

app.use(routes)

app.use((err,req,res, next) => {
  if(err instanceof appError){
    return res.status(err.statusCode).json({
      status : "error",
      message : err.message
    })

    
  }
  console.log(err)
  return res.status(500).json({
    status : "error",
    message : "internal server error"
  })
})

const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))