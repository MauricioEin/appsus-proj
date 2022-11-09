import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const noteService = {
    query,
    get,
    save,
    compose,
    search,
}

const NOTE_KEY = "notesDB"
const LABEL_KEY = "noteLabelsDB"
_createEntitits(NOTE_KEY)


function query(isNotes = true) {
    const key = isNotes ? NOTE_KEY : LABEL_KEY
    return storageService.query(key)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, bookId)
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

function search(val) {
    if (!val) return query()
    const vals = val.trim.split().map(val => val.trim)
    const regexes = vals.map(val => new RegExp(val, 'i'))
    return query()
        .then(notes => notes.filter(note => regexes.every(regex => regex.test(JSON.stringify(note)))))

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
            id: "n102",
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
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }]
            }
        }
    ])
}