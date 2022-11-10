export default {
    template: `
        <div class="note-compose" :style="style">
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
            noteInfo: {},
            style: {},
            colorPalette: [{color:'background-color: var(--usr-clr-red);', title:'Red'},
            {color:'background-color: var(--usr-clr-orng);', title:'Orange'},
            {color:'background-color: var(--usr-clr-yellow);', title:'Yellow'},
            {color:'background-color: var(--usr-clr-grn);', title:'Green'},
            {color:'background-color: var(--usr-clr-teal);', title:'Teal'},
            {color:'background-color: var(--usr-clr-blu);', title:'Blue'},
            {color:'background-color: var(--usr-clr-nvy);', title:'Dark blue'},
            {color:'background-color: var(--usr-clr-prpl);', title:'Purple'},
            {color:'background-color: var(--usr-clr-pnk);', title:'Pink'},
            {color:'background-color: var(--usr-clr-brwn);', title:'Brown'},
            {color:'background-color: var(--usr-clr-gray);', title:'Gray'}]
        }
    },
    created() {

    },
    methods: {
        showComposeSection() {
            this.isShown = true
        },
        saveNote() {
            this.$emit('saveNote', { type: 'note-txt', info: this.noteInfo , style:this.style})
        }
    },
    computed: {

    }
}