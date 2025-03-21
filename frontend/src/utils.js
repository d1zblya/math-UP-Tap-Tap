const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const sum = (arr) => {
    let sum = 0;
    arr.forEach(function (num) {
        sum += num;
    });
    return sum;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export {getRandomNumber, sum, shuffleArray};