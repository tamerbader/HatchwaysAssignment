const router = require('express').Router();
const {validateRequest} = require('../middleware/validateRequest');
const FetchPostsService = require('../services/fetchPosts');
const SortPostsService = require('../services/sortPosts');

/**
 * Registers a GET route for the endpoint /api/posts
 * Returns all posts with matching tags
 */
router.get('', validateRequest, async (req, res) => {

    // Extracting Query Parameters
    const tags = req.query.tags.split(',');
    const sortBy = req.query.sortBy;
    const direction = req.query.direction;

    // Fetching All Posts With Matching Tags
    const postsResult = await FetchPostsService.fetchPosts(tags);

    const sortedPosts = SortPostsService.sortPosts(postsResult, sortBy, direction);

    return res.status(200).json(sortedPosts);
});

module.exports = router;