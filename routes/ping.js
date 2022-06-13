const router = require('express').Router();

/**
 * Registers a GET Route for the endpoint /api/ping
 * Route returns a STATUS_OK response containing a success message
 */
router.get('', (req, res) => {
    console.log('Received a Ping GET Request');
    return res.status(200).json(
        {
            success: true
        }
    )
});

module.exports = router;