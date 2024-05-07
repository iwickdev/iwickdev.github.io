(() => {
function get_secret() {
    const char = Array.from(
        "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    )
    const state = [
        7780,3139,5526,7942,2158,5426,3124,7772,6280,1881,
        7632,8615,4716,5986,2214,5265,2890,3458,4467,2295
    ]

    for (let [index, value] of state.entries())
    {
        state[index] = Math.round(
            value +
            state.at(index - 1) +
            state.at(index + 1) /
            state.at(state.length - 1 - index)
        )
    }

    return state.map(value =>
        char[(Math.abs(value) % (char.length-1))]
    ).join("")
}

Object.defineProperty(window, "hello", {
    get() {
        const response = prompt("Whats the secret?")
        if (response === null) { return }

        if (response === get_secret()) {
            return "Well done, the debugger is power in your browser. Remember it!"
        } else {
            return "Invalid secret, try again. (Hint; the debugger is your friend)"
        }
    }
})

console.log("challenge.js says Hello to the console.")
})()