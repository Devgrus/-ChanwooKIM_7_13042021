const models = require('../models');
const Comment = models.Comment;
const Post = models.Post;
const User = models.User;
const fs = require('fs');


//Création d'un commentaire
exports.createComment = (req, res, next) => {
    const newComment = Comment.create({
        userId: req.body.userId,
        postId: req.body.postId,
        comment: req.body.comment
    })
        .then(newComment => res.status(201).json({ message: 'Post enregistré !'}))
        .catch(error => res.status(400).json({error}));
};

// Modification d'un post
exports.modifyPost = (req, res, next) => {
    /*const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
    Post.updateOne({id: req.params.id}, { ...req.body, id: req.params.id})
        .then(() => res.status(200).json({ message: 'Post modifié !'}))
        .catch(error => res.status(400).json({error}));*/
    
    User.findOne({
        where: {id: req.body.userId}
    })
        .then(user => {
            if(user && (user.id == req.body.userId || user.isAdmin == true)) {
                const imgUrl = "";
                if(req.file) {
                    imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                Post.update(
                    {
                        title: req.body.title,
                        description: req.body.description,
                        imageUrl: imgUrl
                    },
                    { where: {id: req.body.id} }
                )
                    .then(() => res.status(201).json({ message: 'Post enregistré !'}))
                    .catch(error => res.status(400).json({error}));
            }
            else {
                res.status(401).json({ error: "Vous n'avez le droit de modifier ce post !" })
            }
        })
    /*const imgUrl = "";
    if(req.file) {
        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    
    const post = Post.create({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        imageUrl: imgUrl
    })
        .then(() => res.status(201).json({ message: 'Post enregistré !'}))
        .catch(error => res.status(400).json({error})); */
};

// Suppression d'un post
exports.deletePost = (req, res, next) => {
    Post.findOne({id: req.params.id})
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({id: req.params.id})
                    .then(() => res.status(200).json({message: 'Post supprimé !'}))
                    .catch(error => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(500).json({error}));
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