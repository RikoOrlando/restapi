const Contactmodel = require('../models').Contact

class Controller {
    static findall(req,res){
        Contactmodel.findAll()
        .then((data)=>{
            res.json(data)
        })
    }

    static findone(req, res){
        Contactmodel.findOne({
            where: {id: req.params.id}
        })
        .then((data)=>{
            res.json(data)
        })

    }

    static create(req,res){
        let data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            address: req.body.address,
            company: req.body.company
        }
        Contactmodel.create(data)
        .then((data)=>{
            res.json(data)
        })
    }

    static update(req, res){
        Contactmodel.update(req.body,{
            where:{id: req.params.id}
        })
        .then((data)=>{
            res.json(data)
        })

    }

    static delete(req, res){
        Contactmodel.destroy({
            where: {id: req.params.id}
        })
        .then((data)=>{
            res.json(data)
        })

    }

}

module.exports = Controller