const Result = require("../models/Result");
require("dotenv").config();

const pointsObj = {
    1: 10,
    2: 8,
    3: 6,
    4: 4,
    5: 2,
    6: 1
};

const reArrange = arr => {
    const newArr = Object.entries(arr.reduce(
        (acc, cur) => ({
            ...acc,
            [cur.username]: {
                ...acc[cur.username],

                [cur.rank]: (acc[cur.username] || [])[cur.rank]
                    ? acc[cur.username][cur.rank] + 1
                    : 1,

                points: (acc[cur.username] || []).points
                    ? acc[cur.username].points + (pointsObj[cur.rank] || 0)
                    : pointsObj[cur.rank] || 0,

                completed: (acc[cur.username] || []).completed
                    ? acc[cur.username].completed + 1
                    : 1,
                
                user_id: cur.user_id,
            }
        }),
        {}
    ));
    
    const newSortedArr = newArr.sort((a, b) => b[1].points - a[1].points);
    
    const newSortedArrWithRanking = newSortedArr.map((res, idx) => {
        let rank = idx + 1;
        let prevIdx = idx - 1;
        while (prevIdx >= 0 && newSortedArr[idx][1].points === newSortedArr[prevIdx][1].points) {
            rank -= 1;
            prevIdx -= 1;
        }
        return [ res[0], { ...res[1], rank }];
    });

    return newSortedArrWithRanking;
};

const getUsersLeaderboard = (req, res, next) => {
    Result.findAll((err, results) => {
        if (err) return next(err);
        res.status(200).json({
            leaderboard: reArrange(results)
        });
    });
};

module.exports = { getUsersLeaderboard };

// const createResult = (req, res, next) => {
//     const { wodId: wod_id } = req.params;
//     const { id: user_id } = req.userData;
//     const { result } = req.body;
//     Result.create({ wod_id, user_id, result }, (err, results) => {
//         if (err) return next(err);
//         next();
//     });
// };

// const findResultByWodAndUser = (req, res, next) => {
//     const { wodId } = req.params;
//     const { id: userId } = req.userData;
//     Result.find(wodId, userId, (err, results) => {
//         if (err) return next(err);
//         req.result = results[0];
//         next();
//     });
// };

// const updateResult = (req, res, next) => {
//     const { wodId } = req.params;
//     const { id: userId } = req.userData;
//     const { result } = req.body;
//     Result.update(result, wodId, userId, (err, results) => {
//         if (err) return next(err);
//         next();
//     });
// };

// const sendResult = (req, res, next) => {
//     const status = req.method === "POST" ? 201 : 200;
//     res.status(status).json({ result: req.result });
// };

// module.exports = { createResult, findResultByWodAndUser, updateResult, sendResult };
