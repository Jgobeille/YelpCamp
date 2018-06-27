//all the middleware goes here
var middlewareObj = {};
var Campground = require('../models/campground');
var Comment = require('../models/comments');



//Check is user is campground creator middleware
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
     if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.flash('error', 'campground not found');
                res.redirect('back');
            } else {
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else {
                res.flash('error', "You don't have permission to do that");
                res.redirect('back');
            }
           }
        });
    } else {
         res.flash("error", "You need to be logged in to do that");
         res.redirect('back');
    }
};

//Check is user is comment creator middleware
middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            } else {
                //Does user own the comment?
            if(foundComment.author.id.equals(req.user._id)){
            next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect('back');
            }
           }
        });
    } else {
        
         res.redirect('back');
    }
};
 
 
//Logged in Middleware    

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', "You need to be logged in to do that");
    res.redirect('/login');
};

module.exports = middlewareObj