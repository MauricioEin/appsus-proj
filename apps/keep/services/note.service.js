import { storageService } from '../../../../services/async-storage.service.js'
import { utilService } from '../../../../services/util.service.js'

export const noteService = {
    query,
    get,
    save,
    compose,
    getFilteredNotes,
}

const NOTE_KEY = "notesDB"
const LABEL_KEY = "noteLabelsDB"
_createEntitits(NOTE_KEY)
_createEntitits(LABEL_KEY)


function query(isNotes = true) {
    const key = isNotes ? NOTE_KEY : LABEL_KEY
    return storageService.query(key)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, bookId)
}

function getFilteredNotes(filterBy) {
    const { txt, label, type, isPinned } = filterBy
    return query()
        .then(notes => {
            if (txt) return notes.filter(note => _searchTxt(note, txt))
            return notes
        }).then(notes => {
            if (label) return notes.filter(note => {
                const { labels } = note.info
                return (labels && labels.some(noteLabel => label === noteLabel))
            })
            return notes
        }).then(notes => {
            if (type) return notes.filter(note => note.type && note.type === type)
            return notes
        }).then(notes => {
            if (isPinned) return notes.filter(note => note.isPinned)
            return notes
        })
}

function save(note) {
    if (note.id) return storageService.put(NOTE_KEY, note)
    return storageService.post(NOTE_KEY, note)

}

function compose() {
    return {
        type: '',
        info: {},
        isPinned: false,
    }
}

function _searchTxt(note, txt) {
    if (!txt) return query()
    const vals = txt.trim().split().map(val => val.trim())
    const regexes = vals.map(val => new RegExp(val, 'i'))
    return regexes.every(regex => regex.test(JSON.stringify(Object.values(note.info))))

}

function _createEntitits(key) {
    if (key === NOTE_KEY) return utilService.saveToStorage(key, [
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n104",
            type: "note-url",
            info: {
                url: "https://google.com",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
                title: "Bobi and Me"
            }
        },
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                labels: ["Get my stuff together"],
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }]
            }
        },
        {
            id: "n104",
            type: "note-url",
            info: {
                url: "https://google.com",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
                title: "Bobi and Me"
            }
        },
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
                title: "Bobi and Me"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                labels: ["Get my stuff together"],
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }]
            }
        },
        {
            id: "n104",
            type: "note-url",
            info: {
                url: "https://google.com",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                labels: ["Get my stuff together"],
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }]
            }
        },
        {
            id: "n104",
            type: "note-url",
            info: {
                url: "https://google.com",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
                title: "Bobi and Me"
            }
        },
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
                title: "Bobi and Me"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                labels: ["Get my stuff together"],
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }]
            }
        },
        {
            id: "n104",
            type: "note-url",
            info: {
                url: "https://google.com",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
                title: "Bobi and Me"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                labels: ["Get my stuff together"],
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }]
            }
        },
        {
            id: "n104",
            type: "note-url",
            info: {
                url: "https://google.com",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                labels: ["Get my stuff together"],
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }]
            }
        },
    ])
    return utilService.saveToStorage(key, ['Work', 'Home', 'Fun', 'Drawings', 'Pics', 'Videos'])
}