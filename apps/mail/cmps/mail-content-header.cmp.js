
export default {
    props: ['isChecked', 'isToRead', 'isDetails', 'folder', 'idx', 'length'],
    template: `
        <header class="mail-content-header flex justify-between">
            <div class="flex">
                <input class="blocked" type="checkbox" v-if="!isDetails" @change="selectAll" title="Select">
                <span v-else class="btn" :title="'Back to '+folder" @click="$emit('back')">🡨</span> 
                <span class="btn" v-if="!isChecked" title="Refresh" @click="$emit('refresh')">⟳</span>
                <div v-else class="btns">
                    <span class="btn" :title="spamTitle" @click="onSpam">⚠</span>
                    <span class="btn" :title="trashTitle" @click="onTrash">🗑</span>
                    <span class="btn" v-if="!isToRead" @click="$emit('unread')" title="Mark as unread">✉</span>
                    <span class="btn" v-else @click="$emit('unread')" title="Mark as read">📰</span>
                    <span class="btn blocked" title="Snooze">⏰</span>
                    <span class="btn blocked" title="Add to tasks">✅</span>
                </div>
            </div>
            <div v-if="isDetails" class="flex prev-next">
                <p>{{formattedIndex}}</p>
                <span class="btn" title="Newer" @click="$emit('prev')" :class="{disabled:idx===1}">&lt;</span>
                <span class="btn" title="Older" @click="$emit('next')" :class="{disabled:idx===length}">></span>
            </div>
        </header>
    `,
    computed: {
        spamTitle() {
            return this.folder === 'Spam' ? 'Not spam' :
                this.folder === 'Trash' ?
                    'Not trash' : 'Report spam'
        },
        trashTitle() {
            return this.folder === 'Spam' || this.folder === 'Trash' ? 'Delete forever' : 'Delete'
        },
        formattedIndex() {
            return `${this.idx} of ${this.length}`
        }
    },
    methods: {
        selectAll() {
            console.log('selecting all')
        },
        onTrash() {
            this.folder === 'Spam' || this.folder === 'Trash' ?
                this.$emit('eliminate') : this.$emit('trash')
        },
        onSpam() {
            this.folder === 'Trash' ?
                this.$emit('trash') : this.$emit('spam')
        },
    },
}