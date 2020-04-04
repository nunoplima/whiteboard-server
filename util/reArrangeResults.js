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
            [cur.user_id]: {
                ...acc[cur.user_id],

                [cur.rank]: (acc[cur.user_id] || [])[cur.rank]
                    ? acc[cur.user_id][cur.rank] + 1
                    : 1,

                points: (acc[cur.user_id] || []).points
                    ? acc[cur.user_id].points + (pointsObj[cur.rank] || 0)
                    : pointsObj[cur.rank] || 0,

                completed: (acc[cur.user_id] || []).completed
                    ? acc[cur.user_id].completed + 1
                    : 1,
                
                username: cur.username,
                    
                id: cur.user_id,

                gender: cur.gender,
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
        return { ...res[1], rank };
    });

    return newSortedArrWithRanking;
};

module.exports = { reArrange };