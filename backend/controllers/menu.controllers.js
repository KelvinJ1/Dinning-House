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

menuControllers.delete = (req,res) => {

  Menu.deleteOne({_id: req.body.id}).then((rae)=>{
    res.status(200).json({message:'item eliminado'})
  })
}

menuControllers.edit = (req,res) => {

  const menu1 = new Menu({_id: req.body.id,
                          titulo: req.body.titulo,
                          price: req.body.price,
                          description: req.body.description,
                          URL: req.body.URL

  })
  Menu.updateOne({_id: req.body.id},menu1).then((result)=>{
    res.status(200).json({message:'Actualizacion ejecutada'})
  })
}





module.exports = menuControllers;