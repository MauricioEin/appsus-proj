import { storageService } from '../../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    query,
    get,
    saveNote,
    compose,
    getFilteredNotes,
    remove,
}

const NOTE_KEY = "notesDB"
const LABEL_KEY = "noteLabelsDB"
// _createEntities(NOTE_KEY)
// _createEntities(LABEL_KEY)


function query(isNotes = true) {
    const key = isNotes ? NOTE_KEY : LABEL_KEY
    return storageService.query(key)
        .then(entities => {
            if (entities && entities.length) return entities
            return _createEntities(key)
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
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

function saveNote(note) {
    if (note.id) return storageService.put(NOTE_KEY, note)
    return storageService.post(NOTE_KEY, note)

}

function remove(noteId) {
    storageService.remove(NOTE_KEY, noteId)
}

function compose() {
    return {
        id: null,
        info: {
            title: '',
            txt: '',
            todos: [{}],
            url: '',
        },
        isPinned: false,
        type: '',
        style: {}
    }
}

function _searchTxt(note, txt) {
    if (!txt) return query()
    const vals = txt.trim().split(' ').map(val => val.trim())
    const regexes = vals.map(val => new RegExp(val, 'i'))
    return regexes.every(regex => regex.test(JSON.stringify(Object.values(note.info))))

}

function _createEntities(key) {
    if (key === NOTE_KEY) return utilService.saveToStorage(key, [
        {
            id: utilService.makeId(),
            isPinned: false,
            info: {
                type: 'note-txt',
                title: 'Good Habits',
                txt: 'Drink luke warm water in the morning',
                labels: ['Work']
            },
            style: {
                backgroundColor: 'var(--usr-clr-yellow)',
            }
        },
        {
            id: utilService.makeId(),
            isPinned: false,
            info: {
                type: 'note-txt',
                title: 'Answering literaly',
                txt: 'What do you do for a living? I breath.',
                labels: ['Home']
            },
            style: {
                backgroundColor: 'var(--usr-clr-gray)',
            }
        },
        {
            id: utilService.makeId(),
            isPinned: false,
            info: {
                type: 'note-todos',
                todos: [
                    { txt: 'Apples', doneAt: null },
                    { txt: 'Bananas', doneAt: null },
                    { txt: 'ToiletPapaer', doneAt: Date.now() },
                    { txt: 'Tooth paste', doneAt: null },
                ],
                labels: ['Fun']
            },
            style: {
                backgroundColor: 'var(--usr-clr-prpl)'
            }
        },
        {
            id: utilService.makeId(),
            isPinned: false,
            info: {
                type: 'note-img',
                url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2673&q=80',
                title: 'Begin with the view',
                txt: 'This is were it all began. Write 500 words on the disembarking procedure.',
                lastEdited: Date.now(),
                labels: ['Drawings']
            }
        },
        {
            id: utilService.makeId(),
            isPinned: false,
            info: {
                type: 'note-txt',
                title: utilService.makeLoremEng(4),
                txt: utilService.makeLoremEng(9),
                labels: ['Pics']
            }
        },
        {
            id: utilService.makeId(),
            isPinned: false,
            info: {
                type: 'note-todos',
                todos: [
                    { txt: utilService.makeLoremEng(4), doneAt: null },
                    { txt: utilService.makeLoremEng(2), doneAt: null },
                    { txt: utilService.makeLoremEng(3), doneAt: null },
                    { txt: utilService.makeLoremEng(3), doneAt: null },
                    { txt: utilService.makeLoremEng(2), doneAt: null },
                    { txt: utilService.makeLoremEng(2), doneAt: null },
                ],
                labels: ['Videos']
            }
        },
        {
            id: utilService.makeId(),
            isPinned: false,
            info: {
                type: 'note-url',
                title: 'Sapo',
                url: 'https://www.sapo.pt',
                txt: utilService.makeLoremEng(4)
            }
        },
        {
            id: utilService.makeId(),
            isPinned: false,
            info: {
                type: 'note-url',
                title: 'Sapo',
                url: 'https://www.sapo.pt',
                txt: utilService.makeLoremEng(4)
            }
        },




        {
            id: utilService.makeId(),
            isPinned: true,
            info: {
                type: 'note-vid',
                title: 'Bohemian Rhapsodt',
                url: 'https://www.youtube.com/embed/tgbNymZ7vqY',
                txt: `Is this the real life?
                Is this just fantasy?
                Caught in a landside,
                No escape from reality
                Open your eyes,
                Look up to the skies and see,
                I'm just a poor boy, I need no sympathy,
                Because I'm easy come, easy go,
                Little high, little low,
                Any way the wind blows doesn't really matter to
                Me, to me
                Mamaaa,
                Just killed a man,
                Put a gun against his head, pulled my trigger,
                Now he's dead
                Mamaaa, life had just begun,
                But now I've gone and thrown it all away
                Mama, oooh,
                Didn't mean to make you cry,
                If I'm not back again this time tomorrow,
                Carry on, carry on as if nothing really matters
                Too late, my time has come,
                Sends shivers down my spine, body's aching all
                The time
                Goodbye, everybody, I've got to go,
                Gotta leave you all behind and face the truth
                Mama, oooh
                I don't want to die,
                I sometimes wish I'd never been born at all.
                I see a little silhouetto of a man,
                Scaramouch, Scaramouch, will you do the Fandango!
                Thunderbolts and lightning, very, very frightening me
                Galileo, Galileo
                Galileo, Galileo
                Galileo, Figaro - magnificoo
                I'm just a poor boy nobody loves me
                He's just a poor boy from a poor family,
                Spare him his life from this monstrosity
                Easy come, easy go, will you let me go
                Bismillah! No, we will not let you go
                (Let him go!) Bismillah! We will not let you go
                (Let him go!) Bismillah! We will not let you go
                (Let me go) Will not let you go
                (Let me go)(Never) Never let you go
                (Let me go) (Never) let you go (Let me go) Ah
                No, no, no, no, no, no, no
                Oh mama mia, mama mia, mama mia, let me go
                Beelzebub has a devil put aside for me, for me,
                For meee
                So you think you can stop me and spit in my eye
                So you think you can love me and leave me to die
                Oh, baby, can't do this to me, baby,
                Just gotta get out, just gotta get right outta here
                Nothing really matters, Anyone can see,
                Nothing really matters,
                Nothing really matters to me
                Any way the wind blows...
                מקור: Musixmatch
                `,
                labels: ['Fun']
            },
            style: {
                backgroundColor: 'var(--usr-clr-yellow)',
            }
        },
        {
            id: utilService.makeId(),
            isPinned: true,
            info: {
                type: 'note-txt',
                title: 'Jennifer lopez literaly',
                txt: `I seriously feel like the best days are ahead, and I like the idea of getting to do everything I did before but with more knowledge, experience, and street smarts. There's a certain love, appreciation, and gratitude that you have at 40 that you don't have when you're younger, and it makes every accomplishment feel so much better.`,
                labels: ['Home']
            },
            style: {
                backgroundColor: 'var(--usr-clr-blu)',
            }
        },
        {
            id: utilService.makeId(),
            isPinned: true,
            info: {
                type: 'note-todos',
                todos: [
                    { txt: 'Make HTML', doneAt: Date.now() },
                    { txt: 'Make JS', doneAt: null },
                    { txt: 'Make css', doneAt: null },
                    { txt: 'Cry becuse nothing is working', doneAt: Date.now() },
                    { txt: 'Try again', doneAt: null },
                    { txt: 'Order pizza', doneAt: Date.now() },
                    { txt: 'Consult with Mauricio', doneAt: Date.now() },
                    { txt: 'Present project', doneAt: Date.now() },
                ],
                labels: ['Work']
            },
            style: {
                backgroundColor: 'var(--usr-clr-prpl)'
            }
        },
        {
            id: utilService.makeId(),
            isPinned: true,
            info: {
                type: 'note-img',
                url: 'https://plus.unsplash.com/premium_photo-1666432045848-3fdbb2c74531?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80',
                lastEdited: Date.now(),
                labels: ['Drawings']
            }
        },
        {
            id: utilService.makeId(),
            isPinned: true,
            info: {
                type: 'note-txt',
                title: utilService.makeLoremEng(4),
                txt: utilService.makeLoremEng(9),
                labels: ['Pics']
            }
        },
        {
            id: utilService.makeId(),
            isPinned: true,
            info: {
                type: 'note-todos',
                todos: [
                    { txt: utilService.makeLoremEng(4), doneAt: null },
                    { txt: utilService.makeLoremEng(2), doneAt: null },
                    { txt: utilService.makeLoremEng(3), doneAt: null },
                    { txt: utilService.makeLoremEng(3), doneAt: null },
                    { txt: utilService.makeLoremEng(2), doneAt: null },
                    { txt: utilService.makeLoremEng(2), doneAt: null },
                ],
                labels: ['Videos']
            }
        },
        {
            id: utilService.makeId(),
            isPinned: true,
            info: {
                type: 'note-img',
                title: 'John Bryce',
                url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/John_bryce_logo.jpg',
                txt: `https://www.johnbryce.co.il/ 
                ` + utilService.makeLoremEng(4)
            }
        },
        {
            id: utilService.makeId(),
            isPinned: true,
            info: {
                type: 'note-img',
                url: 'https://i.pinimg.com/originals/3c/fd/42/3cfd42bc8c228433bc85d13537d6b860.png',
            }
        },
    ])

    return utilService.saveToStorage(key, [
        { title: 'Work', color: null },
        { title: 'Home', color: null },
        { title: 'Fun', color: null },
        { title: 'Drawings', color: null },
        { title: 'Pics', color: null },
        { title: 'Videos', color: null },
    ])
}