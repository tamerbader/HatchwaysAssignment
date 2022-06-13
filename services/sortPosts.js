const {DirectionFields} = require('../models/directionFields');

/**
 * Method to sort posts based on their sortBy field with the direction provided
 * @param {Object} posts - Object containing all posts 
 * @param {*} sortByField - Provided SortBy Field
 * @param {*} direction  - Provided Direction Field
 * @returns {Object} Sorted Posts Object
 */
let sortPosts = function(posts, sortByField, direction) {
    if (!posts || !posts.posts) {
        return {posts: []};
    }

    let postsArray = posts.posts;
    postsArray.sort(function(a,b){
        switch(direction) {
            case DirectionFields.ASC:
                return a[sortByField] - b[sortByField];
            case DirectionFields.DESC:
                return b[sortByField] - a[sortByField];
        }
    });

    return {posts: postsArray};
}

module.exports = {
    sortPosts: sortPosts
};