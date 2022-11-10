import composeTodo from './compose-cmps/compose-todo.cmp.js'

export default {
    props: ['colorPalette'],
    template: `
        <div class="note-compose general-border" :style="style">
            <div class="relative">
            <input type="txt"
                ref="title"
                v-model="info.title"
                @click="setType('txt')" 
                @input="setType('txt')"
                :placeholder="isShown ? 'Title' : 'Take a note'" 
                class="note-title-input"/>
                <div class=" inline-block">
                    <span v-if="!isShown" class="btn compose-list" @click="setType('todos')">
                        <iconify-icon inline icon="material-symbols:check-box-outline">
                        </iconify-icon>
                    </span>
                    <span v-if="!isShown" class="btn compose-draw">
                        <iconify-icon inline icon="heroicons:paint-brush">
                        </iconify-icon>
                    </span>
                    <span v-if="!isShown" class="btn compose-media">
                        <iconify-icon inline icon="bx:image-alt">
                        </iconify-icon>
                    </span>
                    <span v-else class="note-pinmark block" @click="togglePinned">
                        <iconify-icon v-if="pinned" inline icon="bi:pin-fill"></iconify-icon>
                        <iconify-icon v-else inline icon="bi:pin"></iconify-icon>
                    </span>
                </div>
            </div>
            <section v-if="isShown" class="new-note-input">
                <textarea 
                    v-if="!isNoteTodos"
                    v-model="info.txt"
                    placeholder="Take a note"
                    class="note-text-body-input block">
                </textarea>
                <form  v-if="isNoteTodos">
                    <compose-todo 
                        v-for="(todo, idx) in info.todos.length"
                        @todoAdded="todoAdded" 
                        @toggleDone="toggleDone"
                        :idx="idx"
                        :key="idx" />
                </form>



                <div class="btns-note-compose">
                    <span class="btn"></span>
                    <span class="btn"></span>
                    <span class="btn"></span>
                    <span class="btn btn-color relative">
                        <iconify-icon icon="material-symbols:palette-outline" class="block"></iconify-icon>
                        <div class="note-color-palette absolute hidden general-border">
                            <span 
                                class="btn pill" 
                                v-for="color in colorPalette" 
                                :style="color.color"
                                @click="style=color.color">
                                <span class="color-title hidden">{{color.title}}</span>
                            </span>
                        </div>
                    </span>
                    <span class="btn" @click="saveNote">Close</span>
                </div>
            </section>
        </div>
    `
    ,
    data() {
        return {
            isShown: false,
            isPinned: false,
            info: {
                title: '',
                txt: '',
                style: {},
                todos: [{}],
                url: '',
            },
            type: null,
        }
    },
    created() {

    },
    mounted() {
        this.$refs.title.focus()
    },
    methods: {
        resetVar() {
            this.isShown = false,
                this.isPinned = false,
                this.info = {
                    title: '',
                    txt: '',
                    style: {},
                    todos: [{}],
                    url: '',
                },
                this.type = null
        },
        showTextArea() {
            this.isShown = true
        },
        saveNote() {
            this.resetVar()
            const info = {}
            if (!this.info) return
            let isEmpty = true
            for (let prop in this.info) {
                if (this.info[prop]) {
                    info[prop] = this.info[prop]
                    isEmpty = false
                }
            }
            if (isEmpty) return
            // if (info.todos && info.todos.length) info.todos.pop()
            this.$emit('saveNote', { type: 'note-' + this.type, info, style: this.style })
        },
        togglePinned() {
            this.isPinned = !this.isPinned
        },
        todoAdded({ txt, doneAt, idx }) {
            this.info.todos[idx] = { txt, doneAt }
            if (idx + 1 >= this.info.todos.length) this.info.todos.push({})
        },
        setType(type) {
            if (this.type) return
            this.type = type
            this.isShown = true
        }
    },
    computed: {
        isNoteTodos() {
            return this.type === 'todos'
        }
    },
    components: {
        composeTodo
    },
    watch: {

    }
}