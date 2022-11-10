export default {
    template: `
        <div class="note-compose">
            <div>
            <input type="txt"
                v-model="noteInfo.title"
                @click="showComposeSection" 
                @input="showComposeSection"
                placeholder="Title" 
                class="note-title-input"/>
                <span class="btn">1</span>
                <span class="btn">2</span>
                <span class="btn">3</span>
            </div>
            <section v-if="isShown" class="new-note-input">
                <textarea 
                    v-model="noteInfo.txt"
                    class="note-text-body-input block">
                </textarea>
                <div class="btns-note-compose">
                    <span class="btn"></span>
                    <span class="btn"></span>
                    <span class="btn"></span>
                    <span class="btn btn-color relative">
                        <iconify-icon icon="material-symbols:palette-outline" class="block"></iconify-icon>
                        <div class="note-color-palette absolute hidden">
                            <span class="btn pill" v-for="color in colorPalette" :style="color"></span>
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
            noteInfo: {},
            colorPalette: ['background-color: var(--usr-clr-red);'
                ,'background-color: var(--usr-clr-orng);'
                ,'background-color: var(--usr-clr-yellow);'
                ,'background-color: var(--usr-clr-grn);'
                ,'background-color: var(--usr-clr-teal);'
                ,'background-color: var(--usr-clr-blu);'
                ,'background-color: var(--usr-clr-nvy);'
                ,'background-color: var(--usr-clr-prpl);'
                ,'background-color: var(--usr-clr-pnk);'
                ,'background-color: var(--usr-clr-brwn);'
                ,'background-color: var(--usr-clr-gray);']
        }
    },
    created() {

    },
    methods: {
        showComposeSection() {
            this.isShown = true
        },
        saveNote() {
            this.$emit('saveNote', { type: 'note-txt', info: this.noteInfo })
        }
    },
    computed: {

    }
}