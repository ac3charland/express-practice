for (let i = 0; i < 99; i++) {
    let num = i + 1
    let output = ''

    if (num % 3 === 0) {
        output += 'Fizz'
    }

    if (num % 5 === 0) {
        output += 'Buzz'
    }

    if (output === '') {
        output = num
    }

    console.log(num + ':', output)
}