export default {
    template: `
        <div class="note-compose general-border" :style="style">
            <div class="relative">
            <input type="txt"
                ref="title"
                v-model="noteInfo.title"
                @click="showComposeSection" 
                @input="showComposeSection"
                :placeholder="isShown ? 'Title' : 'Take a note'" 
                class="note-title-input"/>
                <div class=" inline-block">
                    <span v-if="!isShown" class="btn"><iconify-icon inline icon="material-symbols:check-box-outline"></iconify-icon></span>
                    <span v-if="!isShown" class="btn"><iconify-icon inline icon="heroicons:paint-brush"></iconify-icon></span>
                    <span v-if="!isShown" class="btn"><iconify-icon inline icon="bx:image-alt"></iconify-icon></span>
                    <span v-else class="note-pinmark block" @click="togglePinned">
                        <iconify-icon v-if="pinned" inline icon="bi:pin-fill"></iconify-icon>
                        <iconify-icon v-else inline icon="bi:pin"></iconify-icon>
                    </span>
                </div>
            </div>
            <section v-if="isShown" class="new-note-input">
                <textarea 
                    autofocus
                    v-model="noteInfo.txt"
                    placeholder="Take a note"
                    class="note-text-body-input block">
                </textarea>
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
            noteInfo: {},
            style: {},
            colorPalette: [{ color: 'background-color: var(--usr-clr-red);', title: 'Red' },
            { color: 'background-color: var(--usr-clr-orng);', title: 'Orange' },
            { color: 'background-color: var(--usr-clr-yellow);', title: 'Yellow' },
            { color: 'background-color: var(--usr-clr-grn);', title: 'Green' },
            { color: 'background-color: var(--usr-clr-teal);', title: 'Teal' },
            { color: 'background-color: var(--usr-clr-blu);', title: 'Blue' },
            { color: 'background-color: var(--usr-clr-nvy);', title: 'Dark blue' },
            { color: 'background-color: var(--usr-clr-prpl);', title: 'Purple' },
            { color: 'background-color: var(--usr-clr-pnk);', title: 'Pink' },
            { color: 'background-color: var(--usr-clr-brwn);', title: 'Brown' },
            { color: 'background-color: var(--usr-clr-gray);', title: 'Gray' }]
        }
    },
    created() {

    },
    mounted() {
        this.$refs.title.focus()
    },
    methods: {
        showComposeSection() {
            this.isShown = true
        },
        saveNote() {
            this.$emit('saveNote', { type: 'note-txt', info: this.noteInfo, style: this.style })
        },
        togglePinned(){
            this.isPinned = !this.isPinned
        }
    },
    computed: {

    },
    watch: {

    }
}