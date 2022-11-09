
export default {
    props: ['checkedCount'],
    template: `
        <header class="mail-list-header flex justify-between">
            <div>
                <input type="checkbox" @change="selectAll" title="Select">
                <button v-if="!checkedCount" title="Refresh">🔄</button>
                <div v-else>
                    <button title="Archive">📩</button>
                    <button title="Report spam">☢</button>
                    <button title="Delete">🗑</button>
                    <button title="Mark as unread">✉</button>
                    <button title="Snooze">⏰</button>
                    <button title="Add to tasks">✅</button>
                    <button title="Move to">➡</button>
                    <button title="Labels">🏷</button>
                </div>
                <button title="More">...</button>
            </div>
            <div class="flex">
                <p>indexes</p>
                <button title="Newer">&lt;</button>
                <button title="Older">></button>

            </div>
        </header>
    `,
    data() {
    },
    methods: {
        selectAll() {
            console.log('selecting all')
        }
    },
    components: {
    }
}