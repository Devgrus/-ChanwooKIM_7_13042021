// Hachage de mot de passe
const bcrypt = require('bcrypt');

// Gestion de token
const jwt = require('jsonwebtoken');

const models = require('../models');
const User = models.User;
const Post = models.Post;
const Comment = models.Comment;

// Crpytage d'email
const CryptoJS = require('crypto-js');

function cryptEmail(email) {
  const key ="ky";
  const keyutf = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.enc.Base64.parse(key);
  return CryptoJS.AES.encrypt(email, keyutf, { iv: iv }).toString();
}

//Création d'un compte
exports.signup = (req, res, next) => {
  if (!req.body.email || !req.body.userName || !req.body.password) {
    return res.status(400).json({ message: "Vous n'avez pas saisir toutes les informations requises" })
  }
  const RegexEmail = /^[a-z0-9](\.?[a-z0-9]){5,30}@groupomania\.com$/;
  const RegexUserName = /^[a-zA-Zéèçà$$âêîôûäëïöüÂÊÎÔÛÄËÏÖÜÀÆæÇÉÈŒœÙ]+(([',. -][a-zA-Zéèçà$$âêîôûäëïöüÂÊÎÔÛÄËÏÖÜÀÆæÇÉÈŒœÙ ])?[a-zA-Zéèçà$$âêîôûäëïöüÂÊÎÔÛÄËÏÖÜÀÆæÇÉÈŒœÙ]*)*$/;
  const RegexPassword = /^[A-Za-z0-9!@#$%^&*]{8,}$/;
  
  if (RegexEmail.test(req.body.email) && RegexUserName.test(req.body.userName) && RegexPassword.test(req.body.password)) {
    User.findOne({
      where: { email: cryptEmail(req.body.email)}
    })
      .then(user => {
        if (!user) {
          bcrypt.hash(req.body.password, 10)
            .then(hash => {
              const newUser = User.create({
                email: cryptEmail(req.body.email),
                userName: req.body.userName,
                password: hash
              })
              .then(newUser => res.status(201).json({message: 'Utilisateur a été créé !'}))
              .catch(error => res.status(500).json({error}))
            })
            .catch(error => res.status(500).json({error}))
        }

        else {
          return res.status(401).json({ error: 'Utilisateur existe déjà' })
        }
      })
      .catch(error => res.status(500).json({error}));
    
  }

  else {
    return console.log("Regex Error !");
  }
 
    /*let findUserExist = User.findOne({ where: { email: cryptEmail(req.body.email)}})
    if(!findUserExist) {
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const newUser = User.create({
            email: cryptEmail(req.body.email),
            userName: req.body.userName,
            password: hash
          });
        })
        .then(() => res.status(201).json({message: 'Utilisateur a été créé !'}))
        .catch(error => res.status(500).json({error}));
    }
    else {
      res.status(422).json({message: 'Utilisateur existe déjà'})
    }
  }*/
};

// Login
exports.login = (req, res, next) => {
  User.findOne({ where: {email: cryptEmail(req.body.email)} })
    .then(user => {
      if (!user) {
        return res.status(401).json({error: 'Utilisateur introuvable !'});
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({error: /*'Mot de passe incorrect !'*/ `${req.body.password}, ${user.password}`});
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              {userId: user.id},
              'RANDOM_TOKEN_SECRET',
              {expiresIn: '24h'}
            )
          });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

// Suppression d'un compte
exports.deleteUser = (req, res, next) => {
  if(req.body.isAdmin == 'false') {
    User.findOne({where: {email: cryptEmail(req.body.email)} })
      .then(user => {
      if (!user) {
        return res.status(401).json({error: 'Utilisateur introuvable !'});
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({error: 'Mot de passe incorrect !'});
          }
          User.destroy({ where : {email: cryptEmail(req.body.email)}})
            .then(() => res.status(200).json({message: 'Ce compte a été supprimé !'}))
            .catch(error => res.status(400).json({error}));
          Post.findAll({ where : {userId: user.id} })
            .then(res => {
              if(res) {
                for(content of res) {
                  console.log(content.dataValues.id);
                  Comment.destroy({ where: {postId: content.dataValues.id} });
                }
              }
            })
            .catch(error => res.status(400).json({error}));
          Post.destroy({ where : {userId: user.id} })
            .then(() => res.status(200).json({message: 'Les posts de ce compte a été supprimé !'}))
            .catch(error => res.status(400).json({error}));
          Comment.destroy({ where : {userId: user.id} })
            .then(() => res.status(200).json({message: 'Les commentaires de ce compte a été supprimé !'}))
            .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    })
  }
  else if(req.body.isAdmin == 'true') {
    User.findOne({email: cryptEmail(req.body.email)})
      .then(user => {
      if (!user) {
        return res.status(401).json({error: 'Utilisateur introuvable !'});
      }
      User.destroy({ where : {email: cryptEmail(req.body.email)}})
        .then(() => res.status(200).json({message: 'Ce compte a été supprimé !'}))
        .catch(error => res.status(400).json({error}));
      Post.destroy({ where : {userId: user.id} })
        .then(() => res.status(200).json({message: 'Les posts de ce compte a été supprimé !'}))
        .catch(error => res.status(400).json({error}));
      Comment.destroy({ where : {userId: user.id} })
        .then(() => res.status(200).json({message: 'Les commentaires de ce compte a été supprimé !'}))
        .catch(error => res.status(400).json({error}));
    })
      .catch(error => res.status(500).json({error}));
  }
  else {
    return error => res.status(500).json({error})
  }
};