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
        .then(() => res.status(201).json({ message: 'Comment enregistré !'}))
        .catch((error) => res.status(400).json({error}));
};

// Modification d'un commentaire
exports.modifyComment = (req, res, next) => {
    User.findOne({
        where: {id: req.body.userId}
    })
        .then(user => {
            if(user && (user.id == req.body.userId || user.isAdmin == true)) {

                Comment.update(
                    {
                        comment: req.body.comment
                    },
                    { where: {id: req.body.commentId} }
                )
                    .then(() => res.status(201).json({ message: 'Comment modifié !'}))
                    .catch(error => res.status(400).json({error}));
            }
            else {
                res.status(401).json({ error: "Vous n'avez le droit de modifier ce commentaire !" })
            }
        })
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    User.findOne({
        where: {id: req.body.userId}
    })
        .then(user => {
            if(user && (user.id == req.body.userId || user.isAdmin == true)) {
                Comment.findOne({ where: {id: req.body.commentId}})
                    .then(comment => {
                        Comment.destroy({ where: {id: req.body.commentId }})
                            .then(() => res.status(200).json({message: 'Commentaire supprimé !'}))
                            .catch(error => res.status(400).json({error}));
                    })
                    .catch(error => res.status(400).json({error}));
            }
        })
        .catch(error => res.status(500).json({error}));
};

// Récupération des commentaires
exports.getComments = (req, res, next) => {
    Comment.findOne({ 
        where: {postId: req.params.postId},
        //include: [{
        //    model: User,
        //    attributes: ['userName']
        //}],
        order: [['updatedAt', 'DESC']]
     })
        .then(post => {
            if(!post) {
                return res.status(200).json({message: 'No Data'})
            }
        })
        .catch(error => res.status(500).json({error}));
    
};