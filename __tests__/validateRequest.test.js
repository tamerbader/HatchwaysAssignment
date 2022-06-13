const { containsValidTagsParameter, containsValidSortByParameter, containsValidDirectionParameter} = require('../middleware/validateRequest');

describe('Contains Valid Tags Method Tests', function() {
    test('Testing a valid Tags query parameter', () => {
        let parameters = {tags: 'health'}
        expect(containsValidTagsParameter(parameters)).toBe(true);
    })

    test('Testing null value parameters', () => {
        expect(containsValidTagsParameter(null)).toBe(false);
    })

    test('Testing query parameters that do not contain tags', () => {
        let parameters = {name: 'harry'}
        expect(containsValidTagsParameter(parameters)).toBe(false);
    })
})

describe("Contains Valid SortBy Parameters", function() {
    test('Testing Valid SortBy Paramters', () => {
        expect(containsValidSortByParameter('reads')).toBe(true);
    })

    test('Testing Invalid SortBy Parameters', function() {
        expect(containsValidSortByParameter('favorites')).toBe(false)
    })
})

describe("Contains Valid Direction Parameters", function() {
    test('Testing Valid Direction Paramters', () => {
        expect(containsValidDirectionParameter('desc')).toBe(true);
    })

    test('Testing Invalid Direction Parameters', function() {
        expect(containsValidDirectionParameter('up')).toBe(false)
    })
})
