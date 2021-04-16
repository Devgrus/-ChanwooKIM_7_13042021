const Article = require('../models/article');
const fs = require('fs');


//Création d'un article
exports.createArticle = (req, res, next) => {
    const articleObject = JSON.parse(req.body.article);
    //delete articleObject.id;
    const article = new Article({
        ...articleObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    article.save()
      .then(() => res.status(201).json({ message: 'Article enregistré !'}))
      .catch(error => res.status(400).json({error}));
};

// Modification d'un article
exports.modifyArticle = (req, res, next) => {
    const articleObject = req.file ?
        {
            ...JSON.parse(req.body.article),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
    Article.updateOne({id: req.params.id}, { ...req.body, id: req.params.id})
        .then(() => res.status(200).json({ message: 'Article modifié !'}))
        .catch(error => res.status(400).json({error}));
};

// Suppression d'un article
exports.deleteArticle = (req, res, next) => {
    Article.findOne({id: req.params.id})
        .then(article => {
            const filename = article.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Article.deleteOne({id: req.params.id})
                    .then(() => res.status(200).json({message: 'Article supprimé !'}))
                    .catch(error => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(500).json({error}));
};

// Récupération d'un article
exports.getOneArticle = (req, res, next) => {
    Article.findOne({id: req.params.id})
        .then(article => res.status(200).json(article))
        .catch(error => res.status(404).json({error}));
};

// Récupération de tous les articles
exports.getAllArticles = (req, res, next) => {
    Article.find()
        .then(articles => res.status(200).json(articles))
        .catch(error => res.status(400).json({error}));
};