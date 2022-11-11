export default {
    template: `
        <div class="btns-note-compose">
            <span class="btn"></span>
            <span class="btn"></span>
            <span class="btn"></span>
            <span class="btn btn-color relative">
                <iconify-icon icon="material-symbols:palette-outline" class="block"></iconify-icon>
                <div class="note-color-palette absolute hidden general-border">
                    <span 
                        class="btn" 
                        v-for="color in colorPalette" 
                        :style="'background-color:' + color.color"
                        @click="$emit('setColor',color.color)">
                        <span class="color-title hidden">{{color.title}}</span>
                    </span>
                </div>
            </span>
            <span class="btn" @click="$emit('saveNote')">Close</span> 
        </div>
        `,
    data() {
        return {
            colorPalette: [
                { color: 'white; border: .4px solid black', title: 'Plain' },
                { color: 'var(--usr-clr-red);', title: 'Red' },
                { color: 'var(--usr-clr-orng);', title: 'Orange' },
                { color: 'var(--usr-clr-yellow);', title: 'Yellow' },
                { color: 'var(--usr-clr-grn);', title: 'Green' },
                { color: 'var(--usr-clr-teal);', title: 'Teal' },
                { color: 'var(--usr-clr-blu);', title: 'Blue' },
                { color: 'var(--usr-clr-nvy);', title: 'Dark blue' },
                { color: 'var(--usr-clr-prpl);', title: 'Purple' },
                { color: 'var(--usr-clr-pnk);', title: 'Pink' },
                { color: 'var(--usr-clr-brwn);', title: 'Brown' },
                { color: 'var(--usr-clr-gray);', title: 'Gray' }]
        }
    },
    methods: {
    }
}


