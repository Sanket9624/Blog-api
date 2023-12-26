const Validator = require('fastest-validator')
const models = require("../models")

function save(req,res){
            const post = {
                        title:req.body.title,
                        content:req.body.content,
                        imageUrl:req.body.imageUrl,
            }
            const schema = {
                        title:{type:"string", optional:false, max:"100"},
                        content:{type:"string", optional:false, max:"500"},
            }

            const v = new Validator()
            const validationResponse = v.validate(post, schema)
            if(validationResponse !== true){
                        return res.status(400).json({
                                    message:"validate failed",
                                    errors:validationResponse
                        })
            } 
            models.Post.create(post).then(result=>{
                        res.status(201).json({
                        message:"Post created succesfully",
                        post:result
                        })
            }).catch(err =>{
                        res.status(500).json({
                        message:"Something went wrong",
                        err:err
                        })
            })
}

function showById(req,res){
            const id = req.params.id
            
            models.Post.findByPk(id).then(result=>{
                        if(result){
                                    res.status(200).json(result)
                        }else{
                                    res.status(404).json({
                                                message:"Post not found"
                                    })
                        }
            })
            .catch(err=>{
                        res.status(500).json({
                                    message:"Something went wrong",
                                    err:err
                                    })
            })
}

function showAll(req,res){
            const id = req.params.id

            models.Post.findAll(id).then(result =>{
                        res.status(200).json(result)
            }).catch(err=>{ 
                        res.status(500).json({
                        message:"Something went wrong",
                        err:err
                        })
            })
}

function update(req,res){
            const id = req.params.id

            const updatePost = {
                        title : req.body.title,
                        content:req.body.content,
                        imageUrl:req.body.imageUrl,
            }
            const schema = {
                        title:{type:"string",optional:false,max:"100"},
                        content:{type:"string",optional:false,max:"500"},
            }
            const v = new Validator()
            const validationResponse = v.validate(updatePost,schema)
               if(validationResponse !== true){
                        return res.status(500).json({
                                    message:"validate failed"
                        })          
            }
            models.Post.update(updatePost, {where:{id:id}}).then(result=>{
                        res.status(200).json({
                                    message:"Post updated succesfully",
                                    post:updatePost
                        })
            }).catch(err=>{
                        res.status(500).json({
                                    message:"Something went wrong",
                                    err:err
                                    })
            }) 
}
function destroy(req,res){
            const id = req.params.id
           
            models.Post.destroy({where : {id : id}}).then(result=>{
                        res.status(200).json({
                                    message:"message deleted Succesfully",
                        })
            }).catch(err=>{
                        res.status(500).json({
                                    message:"Something went wrong",
                                    err:err
                                    })
            })
}

module.exports = {
            save : save,
            showById : showById,
            showAll : showAll,
            update : update,
            destroy : destroy
}           