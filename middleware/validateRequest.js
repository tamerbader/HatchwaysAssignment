const {SortByFields} = require('../models/sortByFields');
const {DirectionFields} = require('../models/directionFields');

/**
 * Middleware function that validates request query parameters
 * @param {Object} req - Request object 
 * @param {*} res - Response object
 * @param {*} next - Next Middleware Function
 */
const validateRequest = function(req, res, next) {
    // Validate Tags Query parameter is provided and contains values
    const hasValidTags = containsValidTagsParameter(req.query);
    if (!hasValidTags) {
        return res.status(400).json({
            error: "Tags parameter is required"
        });
    }

    // Validates SortBy field contains acceptable values if provided otherwise provides default value
    if (!req.query.sortBy) {
        req.query.sortBy = 'id';
    } else if (!containsValidSortByParameter(req.query.sortBy)) {
        return res.status(400).json({
            error: "sortBy parameter is invalid"
        });
    }

    // Validate Direction Field contains acceptable values if provided otherwise provides default value
    if (!req.query.direction) {
        req.query.direction = 'asc';
    } else if (!containsValidDirectionParameter(req.query.direction)) {
        return res.status(400).json({
            error: "direction parameter is invalid"
        });
    }

    next();
}

/**
 * Method checks for presence of tags in query parameters
 * @param {Object} parameters  - Query parameters provided in request
 * @returns {Boolean} Whether tags were provided or not.
 */
let containsValidTagsParameter = function(parameters) {
    // Ensure there are paramteres provided in request
    if (!parameters) {
        return false;
    }

    // Ensure a tags query parameter was provided
    if (!parameters.tags) {
        return false
    }

    return true;
}

/**
 * Method checks for valid SortBy fields if provided
 * @param {string} sortingField - Provided sortBy field
 * @returns {Boolean} Whether the provided sortBy field is valid or not
 */
let containsValidSortByParameter = function(sortingField) {
    // Checks to see if the sorting field value provided is acceptable
    switch(sortingField) {
        case SortByFields.Id:
        case SortByFields.Reads:
        case SortByFields.Likes:
        case SortByFields.Popularity:
            return true;
        default:
            return false;
    }
}

/**
 * Method checks for valid direction field if provided
 * @param {string} directionField - Provided direction field
 * @returns {Boolean} Whether the provided direction field is valid or not
 */
let containsValidDirectionParameter = function(directionField) {
    // Checks to see if the direction field value provided is acceptable
    switch(directionField) {
        case DirectionFields.DESC:
        case DirectionFields.ASC:
            return true;
        default:
            return false;
    }
}

module.exports = {
    validateRequest,
    containsValidTagsParameter,
    containsValidSortByParameter,
    containsValidDirectionParameter
};