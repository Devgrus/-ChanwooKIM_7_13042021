const models = require('../models');
const fs = require('fs');


//Création d'un post
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    //delete postObject.id;
    const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    post.save()
      .then(() => res.status(201).json({ message: 'Post enregistré !'}))
      .catch(error => res.status(400).json({error}));
};

// Modification d'un post
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
    Post.updateOne({id: req.params.id}, { ...req.body, id: req.params.id})
        .then(() => res.status(200).json({ message: 'Post modifié !'}))
        .catch(error => res.status(400).json({error}));
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
    Post.findOne({id: req.params.id})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({error}));
};

// Récupération de tous les posts
exports.getAllPosts = (req, res, next) => {
    models.Post.findAll()
        .then(posts => {
            return res.status(200).json(posts);
        })
};