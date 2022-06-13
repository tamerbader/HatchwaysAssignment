const axios = require('axios');
const endpoint = 'https://api.hatchways.io/assessment/blog/posts';

/**
 * Method to fetch all posts with matching tags
 * @param {string[]} tags - Array of Tags Requested
 * @returns {Object} Object containing an array of posts
 */
let fetchPosts = async function(tags) {

    let postsRequests = [];
    tags.forEach((tag) => {
        postsRequests.push(axios.get(endpoint + '?tag=' + tag));
    });
    return await Promise.all(postsRequests)
    .then(responses => {
        return combineResponses(responses);
    })
    .catch(error => {
        console.log(error);
        return null;
    })
}
/**
 * Method to combine multiple responses of individual tags while eliminating duplicates
 * @param {Object[]} responses - An Array of responses from axios
 * @returns {Object} Object containing an array of posts
 */
let combineResponses = function(responses) {
    let posts = {};
    let postsArray = [];
    let postIds = new Set();

    responses.forEach(response => {
        let responseData = response.data;
        if (!responseData || !responseData.posts) {
            return;
        }
        let responsePosts = responseData.posts;
        responsePosts.forEach(post => {
            if (!postIds.has(post.id)) {
                postsArray.push(post);
                postIds.add(post.id);
            }
        });
    });
    posts.posts = postsArray;
    return posts;
}

module.exports = {
    fetchPosts: fetchPosts,
    combineResponses: combineResponses
};