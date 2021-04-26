const models = require('../models');
const Post = models.Post;
const Comment = models.Comment;
const User = models.User;
const fs = require('fs');


//Création d'un post
exports.createPost = (req, res, next) => {
    let imgUrl = "";
    if(req.file) {
        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    const newPost = Post.create({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        imageUrl: imgUrl
    })
        .then(() => res.status(201).json({ message: 'Post enregistré !'}))
        .catch(error => res.status(400).json({error}));
};

// Modification d'un post
exports.modifyPost = (req, res, next) => {
    
    User.findOne({
        where: {id: req.body.userId}
    })
        .then(user => {
            if(user && (user.id == req.body.userId || user.isAdmin == true)) {
                let imgUrl = "";
                if(req.file) {
                    imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    Post.update(
                        {
                            title: req.body.title,
                            description: req.body.description,
                            imageUrl: imgUrl
                        },
                        { where: {id: req.body.postId} }
                    )
                        .then(() => res.status(201).json({ message: 'Post enregistré !'}))
                        .catch(error => res.status(400).json({error}));
                }
                else {
                    Post.update(
                        {
                            title: req.body.title,
                            description: req.body.description,
                        },
                        { where: {id: req.body.postId} }
                    )
                        .then(() => res.status(201).json({ message: 'Post enregistré !'}))
                        .catch(error => res.status(400).json({error}));
                }
                
                
            }
            else {
                res.status(401).json({ error: "Vous n'avez le droit de modifier ce post !" })
            }
        })
};

// Suppression d'un post
exports.deletePost = (req, res, next) => {
    User.findOne({
        where: {id: req.body.creater}
    })
        .then(user => {
            if(user && (user.id == req.body.userId || user.isAdmin == true)) {
                Post.findOne({ where: {id: req.body.postId}})
                .then(post => {
                    if(post.imageUrl != '') {
                        const filename = post.imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                        Post.destroy({ where: {id: req.body.postId }})
                            .then(() => res.status(200).json({message: 'Post supprimé !'}))
                            .catch(error => res.status(400).json({error}));
                        Comment.destroy({ where: {postId: req.body.postId} })
                            .then(() => res.status(200).json({message: 'Commentaire supprimé !'}))
                            .catch(error => res.status(400).json({error}));
                    });
                    }
                    else {
                        Post.destroy({ where: {id: req.body.postId }})
                            .then(() => res.status(200).json({message: 'Post supprimé !'}))
                            .catch(error => res.status(400).json({error}));
                        Comment.destroy({ where: {postId: req.body.postId} })
                            .then(() => res.status(200).json({message: 'Commentaire supprimé !'}))
                            .catch(error => res.status(400).json({error}));
                    }    
                })
                .catch(error => res.status(500).json({error}));
            }
        })
    
};

// Récupération d'un post
exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: {id: req.params.id},
        include: [{
            model: User,
            attributes: ['userName']
        }]
     })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({error}));
};

// Récupération de tous les posts
exports.getAllPosts = (req, res, next) => {
    Post.findAll({ 
        include: [{
            model: User,
            attributes: ['userName']
        }],
        order: [['updatedAt', 'DESC']] })
        .then(posts => {res.status(200).json(posts)})
        .catch(error => res.status(404).json({error}));
};