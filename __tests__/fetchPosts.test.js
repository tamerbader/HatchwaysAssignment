const {combineResponses} = require('../services/fetchPosts');

describe('Testing Combine Responses', function() {
    test('Combining two empty posts responses', () => {
        let emptyResponse = {data: { posts: []}}
        let responses = [emptyResponse, emptyResponse];

        let expectedResult = [];
        expect(combineResponses(responses).posts).toEqual([]);
    })

    test('Combining one filled and one empty posts responses', () => {
        let emptyResponse = {data: { posts: []}}
        let goodResponse = {data: {posts: [ {id: 1}]}};
        let responses = [goodResponse, emptyResponse];

        expect(combineResponses(responses).posts).toEqual([ {id: 1}]);
    })

    test('Combining two unique responses', () => {
        let responseOne = {data: {posts: [ {id: 1}]}};
        let responseTwo = {data: {posts: [ {id: 2}]}};
        let responses = [responseOne, responseTwo];

        expect(combineResponses(responses).posts).toEqual([ {id: 1}, {id: 2}]);
    })

    test('Combining two responses that contain duplicates', () => {
        let responseOne = {data: {posts: [ {id: 1}]}};
        let responseTwo = {data: {posts: [ {id: 2}, {id: 1}]}};
        let responses = [responseOne, responseTwo];

        expect(combineResponses(responses).posts).toEqual([ {id: 1}, {id: 2}]);
    })

    test('No responses returned', () => {
        let responses = [];

        expect(combineResponses(responses).posts).toEqual([]);
    })

    test('Response returned with no post', () => {
        let response = {data: {}};
        let responses = [response];

        expect(combineResponses(responses).posts).toEqual([]);
    })
})