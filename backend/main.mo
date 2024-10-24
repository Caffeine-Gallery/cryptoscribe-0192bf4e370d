import Array "mo:base/Array";
import Func "mo:base/Func";
import Int "mo:base/Int";
import Text "mo:base/Text";

import Nat "mo:base/Nat";
import Time "mo:base/Time";

actor {

  // Define the Post type
  type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  // Stable variable to store posts
  stable var posts: [Post] = [];

  // Function to add a new post
  public shared({ caller }) func addPost(title: Text, body: Text, author: Text) : async Nat {
    let id = Array.size(posts);
    let timestamp = Time.now();
    let newPost: Post = {
      id = id;
      title = title;
      body = body;
      author = author;
      timestamp = timestamp;
    };
    // Append the new post to the posts array
    posts := Array.append<Post>(posts, [newPost]);
    return id;
  };

  // Function to get all posts
  public query func getPosts() : async [Post] {
    // Return posts in reverse order to display the most recent at the top
    return Array.reverse<Post>(posts);
  };
}
