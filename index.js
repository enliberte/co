const asyncPlusOne = (number, delay) => new Promise((resolve, reject) => {
    setTimeout(() => {resolve(number + 1)}, delay);
});


function *gen() {
    const a = yield asyncPlusOne(0, 3000);
    console.log(a);

    const b = yield asyncPlusOne(a, 2000);
    console.log(b);

    const c = yield asyncPlusOne(b, 1000);
    console.log(c);
}


const co = (generator) => {
    const iterator = generator();
    const next = (value) => {
        const iteration = iterator.next(value);
        if (!iteration.done) {
            iteration.value.then(result => {next(result)})
        }
    };

    next();
};

co(gen);