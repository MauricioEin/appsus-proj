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
    const vals = val.split
    const regexes = vals.map(val => new RegExp(val, 'i'))
    return query()
        .then(notes => notes.filter(note => {
            const { info } = note
            if (info.txt && regexes.every(regex => regex.test(info.txt))) return true
            if (info.title && regexes.every(regex => regex.test(info.title))) return true
            if (info.url && regexes.every(regex => regex.test(info.url))) return true
            if (info.todos && info.todos.some(todo => regexes.every(regex => regex.test(todo.txt)))) return true
        }))

}

function _createEntitits(key) {
    if (key === NOTE_KEY) return utilService.saveToStorage([
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "http://some-img/me",
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
                label: "Get my stuff together", todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }]
            }
        }
    ])
}