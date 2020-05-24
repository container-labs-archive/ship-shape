



## Firebase

https://www.airpair.com/firebase/posts/structuring-your-firebase-data

role-security
https://gist.github.com/sararob/331760829a9dcb4be3e7

sick react-hot-redux firebase

https://github.com/douglascorrea/react-hot-redux-firebase-starter/tree/master/src


https://github.com/adjohnson916/firedux


clean, with login example
https://react.rocks/example/todo-react-redux2


var ref = firebase.database().ref("dinosaurs");
ref.orderByChild("height").equalTo(25).on("child_added", function(snapshot) {
  console.log(snapshot.key);
});



# TODO:

+ [ ] warn users before they leave the page that it won't be saved (listen for navigation events?)
+ [ ] add min/max ranges for different factors. aka 2-8 is ok, but less or more should not be allowable
