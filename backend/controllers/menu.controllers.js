const Menu = require("../models/Menu");
const menuControllers = {};

menuControllers.create = async (req, res) => {

  if(req.decoded.role === 1){
    const {titulo, price, description, URL} = req.body
    const menu = new Menu({titulo, price, description, URL})
    await menu.save()
  
    res.status(201).json({message: "un nuevo menu ha sido creado", menu, user: req.decoded}) 
  } else {
    res.status(401).json({message: "Tu no puedes crear un menu"})
  }
} 

menuControllers.listar = (req, res) => {

      Menu.find().then((menuResult)=>{
        if (menuResult) {
          final=[]
          for (let i=0; i<menuResult.length;i++){
            final.push(menuResult[i])
          }   
        }res.status(200).json(final)
        
      }).catch(er=>{res.status(400).json({message: "Error en menu.controller"})})
        
       
      }

    



module.exports = menuControllers;
