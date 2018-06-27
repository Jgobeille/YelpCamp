var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment    = require('./models/comments');
var data = [
    {
        name: 'Night Sky RV', 
        image: 'https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f6c478a7e9bdb0_340.jpg',
        description: "Lorem ipsum dolor amet flannel af kombucha dreamcatcher keytar. Stumptown wolf knausgaard hammock coloring book meh pinterest. Schlitz tote bag snackwave normcore, synth polaroid meh. Lomo portland jianbing, fixie ramps mixtape lumbersexual try-hard photo booth brunch food truck kale chips. Lumbersexual taxidermy pok pok pork belly. VHS readymade tumblr occupy fashion axe you probably haven't heard of them flannel. Literally before they sold out jianbing seitan poutine copper mug, fanny pack kitsch echo park."
        
    },
    {
        name: 'AIRSTREAM ', 
        image: 'https://pixabay.com/get/e836b40629f7043ed1584d05fb1d4e97e07ee3d21cac104497f6c478a7e9bdb0_340.jpg',
        description: "Lorem ipsum dolor amet flannel af kombucha dreamcatcher keytar. Stumptown wolf knausgaard hammock coloring book meh pinterest. Schlitz tote bag snackwave normcore, synth polaroid meh. Lomo portland jianbing, fixie ramps mixtape lumbersexual try-hard photo booth brunch food truck kale chips. Lumbersexual taxidermy pok pok pork belly. VHS readymade tumblr occupy fashion axe you probably haven't heard of them flannel. Literally before they sold out jianbing seitan poutine copper mug, fanny pack kitsch echo park."
        
    },
    {
        name: 'The Shittiest Campground', 
        image: 'https://farm4.staticflickr.com/3247/2997486559_876fc019c2.jpg',
        description: "Lorem ipsum dolor amet flannel af kombucha dreamcatcher keytar. Stumptown wolf knausgaard hammock coloring book meh pinterest. Schlitz tote bag snackwave normcore, synth polaroid meh. Lomo portland jianbing, fixie ramps mixtape lumbersexual try-hard photo booth brunch food truck kale chips. Lumbersexual taxidermy pok pok pork belly. VHS readymade tumblr occupy fashion axe you probably haven't heard of them flannel. Literally before they sold out jianbing seitan poutine copper mug, fanny pack kitsch echo park."
        
    },
];

    function seedDB(){
         Campground.remove({}, function(err){
//             if(err){
//               console.log(err);
//         }
//         console.log('remove campgrounds!');
//         Comment.remove({}, function(err){
//             if(err){
//                 console.log(err);
//             }
//         //add a few campgrounds
//         data.forEach(function(seed){
//             Campground.create(seed, function(err, campground){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log('added a campground');
//                 //create a comment
//                     Comment.create(
//                     {
//                         text: "This place is great, but I wish it didn't suck so much",
//                         author: 'Your mom'
//                     }, function(err, comment){
//                         if(err){
//                             console.log(err);
//                         } else {
//                             campground.comments.push(comment);
//                             campground.save();
//                             console.log('created new comment');
//                         }
//                     });
//                 }
//             });
//         });
//     });
 });
}

   
module.exports = seedDB;