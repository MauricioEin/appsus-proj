export const utilService = {
    save: saveToStorage,
    load: loadFromStorage,
    makeId,
    lorem: makeLoremEng,
    random: getRandomInt,
    evPos: getEventPositions,
    evDelta: getPositionsDelta
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function makeLoremEng(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

function getEventPositions(ev) {
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        return {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return { x: ev.offsetX, y: ev.offsetY }
}

function getPositionsDelta(ev, lastGrabPos) {
    if (TOUCH_EVS.includes(ev.type)) {
        // ev.preventDefault()
        const currGrabPos = getEventPositions(ev)
        return {
            x: currGrabPos.x - lastGrabPos.x,
            y: currGrabPos.y - lastGrabPos.y
        }
    }
    return {
        x: ev.movementX,
        y: ev.movementY
    }
}