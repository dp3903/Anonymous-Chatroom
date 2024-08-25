const express = require('express');
const { check,validationResult } = require('express-validator');
const router = express.Router();

// functions
const getRoomById = require('../functions/getRoomById');
const createRoom = require('../functions/createRoom');
const deleteRoomById = require('../functions/deleteRoomById');
const joinRoom = require('../functions/joinRoomById');
const leaveRoom = require('../functions/leaveRoomById');

// errorhandler
const errorhadler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

router.get(
    '/getRoomById',
    [
        check('roomId')
            .not()
            .isEmpty()
            .isLength({min: 6, max: 6}),
    ],
    errorhadler,
    getRoomById.getRoomById
);

router.post(
    '/createRoom',
    [
        check('name')
            .not()
            .isEmpty(),
        check('creator')
            .not()
            .isEmpty(),
    ],
    errorhadler,
    createRoom.createRoom
);

// Not a user functionality but works

// router.delete(
//     '/deleteRoom',
//     [
//         check('roomId')
//             .not()
//             .isEmpty()
//             .isLength({min: 6, max: 6}),
//     ],
//     errorhadler,
//     deleteRoomById.deleteRoomById
// )

router.post(
    '/joinRoom',
    [
        check('roomId')
            .not()
            .isEmpty()
            .isLength({min: 6, max: 6}),
        check('user')
            .not()
            .isEmpty(),
    ],
    errorhadler,
    joinRoom
)

router.post(
    '/leaveRoom',
    [
        check('roomId')
            .not()
            .isEmpty()
            .isLength({min: 6, max: 6}),
        check('user')
            .not()
            .isEmpty(),
    ],
    errorhadler,
    leaveRoom
)

module.exports = router;