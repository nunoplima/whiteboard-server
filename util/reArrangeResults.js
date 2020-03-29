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

module.exports = { reArrange };