var express         = require('express');
var router          = express.Router();
var Campground      = require('../models/campground');
var middleware      = require('../middleware');
var NodeGeocoder    = require('node-geocoder');
//Line 7 - 21 Multer Config
var multer          = require('multer');

var storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

var imageFilter = function (req, file, cb) {
    // accept image file only
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
};
// line 23-30 Cloudinary config
var upload = multer({ storage: storage, fileFilter: imageFilter});

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'jgobeille1',
    api_key: "492826531953483",
    api_secret: "sh_4DezJCvhMdF_9vwtC-9jcylA"
});
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY, //This will populate the API key we don't want others to see and make google maps available
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

//INDEX - show all campgrounds
router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), "gi");
    Campground.find({name: regex}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           if(allCampgrounds.length < 1) {
               noMatch ="No campgrounds match that query, please try again";
           }
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds', noMatch: noMatch});
       }
    });
    }else {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds', noMatch: noMatch});
       }
    });
    }
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    // var image = req.body.image;
    var desc = req.body.description;
    var author = {
         id: req.user._id,
         username: req.user.username
      };
  geocoder.geocode(req.body.location, function (err, data) {
    cloudinary.uploader.upload(req.file.path, function(result) {
      // add cloudinary url for the image to the campground object under image property
      var image = result.secure_url;
      var imageId = result.public_id;
      
      
    
      if (err || !data.length) {
        req.flash('error', 'Invalid address');
        return res.redirect('back');
      }

      var lat = data[0].latitude;
      var lng = data[0].longitude;
      var location = data[0].formattedAddress;
      var newCampground = {name: name, price: price, image: image, imageId: imageId, description: desc, author: author, location: location, lat: lat, lng: lng};
      
      

      // Create a new campground and save to DB
      Campground.create(newCampground, function(err, newlyCreated){
        if(err){
          console.log(err);
        } else {
          //redirect back to campgrounds page
          console.log(newlyCreated);
          res.redirect("/campgrounds");
        }
      });
    });
  });
});

//New - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

//Show - shows more infor about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
        //render show template with that campground   
        res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campgrounds/edit', {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});


//DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership,  function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
//exports information
module.exports = router;
