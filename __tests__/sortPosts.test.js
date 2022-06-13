const {sortPosts} = require('../services/sortPosts');

describe('Sorting Posts Tests', function() {
    test('Empty posts object provided', () => {
        let posts = {};

        expect(sortPosts(posts, "id", "asc")).toEqual({posts: []});
    })

    test('Empty posts array provided', () => {
        let posts = {posts: []};

        expect(sortPosts(posts, "id", "asc")).toEqual({posts: []});
    })

    test ('Sort posts by id field with ascending directions', () => {
        let posts = {posts: [{id: 9}, {id: 4}, {id: 8}, {id: 2}]};

        expect(sortPosts(posts, "id", "asc")).toEqual({posts: [{id: 2}, {id: 4},{id: 8}, {id: 9}]});
    })

    test ('Sort posts by id field with descending directions', () => {
        let posts = {posts: [{id: 9}, {id: 4}, {id: 8}, {id: 2}]};

        expect(sortPosts(posts, "id", "desc")).toEqual({posts: [{id: 9}, {id: 8}, {id: 4}, {id: 2}]});
    })
})