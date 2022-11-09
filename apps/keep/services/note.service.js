import { storageService } from '../../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

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
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            info: {
                title: 'Good Habits',
                txt: 'Drink luke warm water in the morning'
            },
            style: {
                backgroundColor: 'var(--usr-clr-yellow)',
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            info: {
                title: 'Answering literaly',
                txt: 'What do you do for a living? I breath.'
            },
            style: {
                backgroundColor: 'var(--usr-clr-gray)',
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-todos',
            isPinned: false,
            info: {
                todos: [
                    {txt:'Apples', doneAt:null},
                    {txt:'Bananas', doneAt:null},
                    {txt:'ToiletPapaer', doneAt:Date.now()},
                    {txt:'Tooth paste', doneAt:null},
                ]
            },
            style: {
                backgroundColor: 'var(--usr-clr-prpl)'
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-img',
            isPinned: false,
            info: {
                url:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2673&q=80',
                title: 'Begin with the view',
                txt: 'This is were it all began. Write 500 words on the disembarking procedure.',
                lastEdited: Date.now()
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-txt',
            isPinned: false,
            info: {
                title: utilService.makeLoremEng(4),
                txt: utilService.makeLoremEng(9),
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-todos',
            isPinned: false,
            info: {
                todos: [
                    {txt: utilService.makeLoremEng(4), doneAt:null},
                    {txt: utilService.makeLoremEng(2), doneAt:null},
                    {txt: utilService.makeLoremEng(3), doneAt:null},
                    {txt: utilService.makeLoremEng(3), doneAt:null},
                    {txt: utilService.makeLoremEng(2), doneAt:null},
                    {txt: utilService.makeLoremEng(2), doneAt:null},
                ]
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-url',
            isPinned: false,
            info: {
                title: 'Sapo',
                url:'https://www.sapo.pt',
                txt: utilService.makeLoremEng(4)
            }
        },
        {
            id: utilService.makeId(),
            type: 'note-url',
            isPinned: false,
            info: {
                title: 'Sapo',
                url:'https://www.sapo.pt',
                txt: utilService.makeLoremEng(4)
            }
        },


        `
        backgroundColor: 'var(--usr-clr-red)'
        backgroundColor: 'var(--usr-clr-orng)'
        backgroundColor: 'var(--usr-clr-yellow)'
        backgroundColor: 'var(--usr-clr-grn)'
        backgroundColor: 'var(--usr-clr-teal)'
        backgroundColor: 'var(--usr-clr-blu)'
        backgroundColor: 'var(--usr-clr-nvy)'
        backgroundColor: 'var(--usr-clr-prpl)'
        backgroundColor: 'var(--usr-clr-pnk)'
        backgroundColor: 'var(--usr-clr-brwn)'
        backgroundColor: 'var(--usr-clr-gray)'
        backgroundColor: var()
        `
        // {
        //     id: "n101",
        //     type: "note-txt",
        //     isPinned: true,
        //     info: {
        //         txt: "Fullstack Me Baby!"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n104",
        //     type: "note-url",
        //     info: {
        //         url: "https://google.com",
        //         title: "Bobi and Me"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n102",
        //     type: "note-img",
        //     info: {
        //         url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
        //         title: "Bobi and Me"
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-txt",
        //     isPinned: true,
        //     info: {
        //         txt: "Fullstack Me Baby!"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n103",
        //     type: "note-todos",
        //     info: {
        //         labels: ["Get my stuff together"],
        //         todos: [
        //             { txt: "Driving liscence", doneAt: null },
        //             { txt: "Coding power", doneAt: 187111111 }]
        //     }
        // },
        // {
        //     id: "n104",
        //     type: "note-url",
        //     info: {
        //         url: "https://google.com",
        //         title: "Bobi and Me"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n102",
        //     type: "note-img",
        //     info: {
        //         url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
        //         title: "Bobi and Me"
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-txt",
        //     isPinned: true,
        //     info: {
        //         txt: "Fullstack Me Baby!"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n102",
        //     type: "note-img",
        //     info: {
        //         url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
        //         title: "Bobi and Me"
        //     }
        // },
        // {
        //     id: "n103",
        //     type: "note-todos",
        //     info: {
        //         labels: ["Get my stuff together"],
        //         todos: [
        //             { txt: "Driving liscence", doneAt: null },
        //             { txt: "Coding power", doneAt: 187111111 }]
        //     }
        // },
        // {
        //     id: "n104",
        //     type: "note-url",
        //     info: {
        //         url: "https://google.com",
        //         title: "Bobi and Me"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-txt",
        //     isPinned: true,
        //     info: {
        //         txt: "Fullstack Me Baby!"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-vid",
        //     isPinned: true,
        //     info: {
        //         txt: "fufufufufufufuufufufuf!",
        //         url: 'https://www.youtube.com/watch?v=tgbNymZ7vqY&ab_channel=TheMuppets'
        //     }
        // },
        // {
        //     id: "n103",
        //     type: "note-todos",
        //     info: {
        //         labels: ["Get my stuff together"],
        //         todos: [
        //             { txt: "Driving liscence", doneAt: null },
        //             { txt: "Coding power", doneAt: 187111111 }]
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-vid",
        //     isPinned: true,
        //     info: {
        //         txt: "what the fudge!",
        //         url: 'https://www.youtube.com/watch?v=5bX_yRzCuM4&ab_channel=PeterChen2.0'
        //     }
        // },
        // {
        //     id: "n104",
        //     type: "note-url",
        //     info: {
        //         url: "https://google.com",
        //         title: "Bobi and Me"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n102",
        //     type: "note-img",
        //     info: {
        //         url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
        //         title: "Bobi and Me"
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-txt",
        //     isPinned: true,
        //     info: {
        //         txt: "Fullstack Me Baby!"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-vid",
        //     isPinned: true,
        //     info: {
        //         txt: "what the fudge!",
        //         url: 'https://www.youtube.com/watch?v=5bX_yRzCuM4&ab_channel=PeterChen2.0'
        //     }
        // },
        // {
        //     id: "n102",
        //     type: "note-img",
        //     info: {
        //         url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
        //         title: "Bobi and Me"
        //     }
        // },
        // {
        //     id: "n103",
        //     type: "note-todos",
        //     info: {
        //         labels: ["Get my stuff together"],
        //         todos: [
        //             { txt: "Driving liscence", doneAt: null },
        //             { txt: "Coding power", doneAt: 187111111 }]
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-vid",
        //     isPinned: true,
        //     info: {
        //         txt: "what the fudge!",
        //         url: 'https://www.youtube.com/watch?v=5bX_yRzCuM4&ab_channel=PeterChen2.0'
        //     }
        // },
        // {
        //     id: "n104",
        //     type: "note-url",
        //     info: {
        //         url: "https://google.com",
        //         title: "Bobi and Me"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-vid",
        //     isPinned: true,
        //     info: {
        //         txt: "what the fudge!",
        //         url: 'https://www.youtube.com/watch?v=5bX_yRzCuM4&ab_channel=PeterChen2.0'
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-txt",
        //     isPinned: true,
        //     info: {
        //         txt: "Fullstack Me Baby!"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n102",
        //     type: "note-img",
        //     info: {
        //         url: "https://chocolatecoveredkatie.com/wp-content/uploads/2020/08/Vegan-Chocolate-Bars.jpg.webp",
        //         title: "Bobi and Me"
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-vid",
        //     isPinned: true,
        //     info: {
        //         txt: "what the fudge!",
        //         url: 'https://www.youtube.com/watch?v=5bX_yRzCuM4&ab_channel=PeterChen2.0'
        //     }
        // },
        // {
        //     id: "n103",
        //     type: "note-todos",
        //     info: {
        //         labels: ["Get my stuff together"],
        //         todos: [
        //             { txt: "Driving liscence", doneAt: null },
        //             { txt: "Coding power", doneAt: 187111111 }]
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-vid",
        //     isPinned: true,
        //     info: {
        //         txt: "what the fudge!",
        //         url: 'https://www.youtube.com/watch?v=5bX_yRzCuM4&ab_channel=PeterChen2.0'
        //     }
        // },
        // {
        //     id: "n104",
        //     type: "note-url",
        //     info: {
        //         url: "https://google.com",
        //         title: "Bobi and Me"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     id: "n101",
        //     type: "note-vid",
        //     isPinned: true,
        //     info: {
        //         txt: "what the fudge!",
        //         url: 'https://www.youtube.com/watch?v=5bX_yRzCuM4&ab_channel=PeterChen2.0'
        //     }
        // },
        // {
        //     id: "n103",
        //     type: "note-todos",
        //     info: {
        //         labels: ["Get my stuff together"],
        //         todos: [
        //             { txt: "Driving liscence", doneAt: null },
        //             { txt: "Coding power", doneAt: 187111111 }]
        //     }
        // },
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