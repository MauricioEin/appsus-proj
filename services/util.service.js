const regexToUrl = new RegExp('(http|https)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?', 'g')
const regexToStr = new RegExp('\<.*\>', 'g')
const youtubeIdRegex = /(\?v\=).*(\&ab)/ig

export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    makeLoremEng,
    getDeepCopy,
    getRandomInt,
    getEventPositions,
    getPositionsDelta,
    strWithLinks: stringToLink,
    htmlToStr,
    youtubeToEmbed,
}

export const strWithLinks = { stringToLink }

function saveToStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : null
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

function getDeepCopy(entity){
    return JSON.parse(JSON.stringify(entity))
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

function stringToLink(str) {
    if (typeof str !== 'string') return ''
    return str.replaceAll(regexToUrl, str => `<a class="usr-url" target="_blank" contenteditable="false" href="${str}">${str}</a>`)
}

function htmlToStr(html) {
    return html.replaceAll(regexToStr, '')
}

function youtubeToEmbed(url) {
    if (!/(\?v\=).*(\&ab)/.test(url)) return url
    console.log('https://www.youtube.com/embed/' + url.match(/(\?v\=).*(\&ab)/)[0].slice(3,-3))
    return 'https://www.youtube.com/embed/' + url.match(/(\?v\=).*(\&ab)/)[0].slice(3,-3)
}