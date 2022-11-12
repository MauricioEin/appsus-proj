export default {
    template: `
    <div class="inline-block compose-types">
                    <span v-if="!isShown" class="btn compose-list" @click="$emit('setType', 'note-todos')">
                        <iconify-icon inline icon="material-symbols:check-box-outline">
                        </iconify-icon>
                    </span>
                    <span v-if="!isShown" class="btn compose-url" @click="$emit('setType', 'note-url')">
                    <iconify-icon inline icon="material-symbols:add-link"></iconify-icon>
                        </iconify-icon>
                    </span>
                    <span v-if="!isShown" class="btn compose-draw">
                        <iconify-icon inline icon="heroicons:paint-brush">
                        </iconify-icon>
                    </span>
                    <span v-if="!isShown" class="btn compose-media" @click="$emit('setType', 'note-img')">
                        <iconify-icon inline icon="bx:image-alt">
                        </iconify-icon>
                    </span>
                    <span v-if="!isShown" class="btn compose-media" @click="$emit('setType', 'note-vid')">
                        <iconify-icon inline icon="arcticons:youtube">

                        </iconify-icon>
                    </span>
                    <span v-else class="note-pinmark block" @click="$emit('togglePinned')">
                        <iconify-icon v-if="pinned" inline icon="bi:pin-fill"></iconify-icon>
                        <iconify-icon v-else inline icon="bi:pin"></iconify-icon>
                    </span>
                </div>
        `,
        data(){

        },
        methods: {
        }
}