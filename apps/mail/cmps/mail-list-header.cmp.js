
export default {
    props: ['checkedCount'],
    template: `
        <header class="mail-list-header flex justify-between">
            <div class="flex">
                <input type="checkbox" @change="selectAll" title="Select">
                <span class="btn" v-if="!checkedCount" title="Refresh">🔄</span>
                <div v-else>
                    <span class="btn" title="Archive">📩</span>
                    <span class="btn" title="Report spam">☢</span>
                    <span class="btn" title="Delete">🗑</span>
                    <span class="btn" title="Mark as unread">✉</span>
                    <span class="btn" title="Snooze">⏰</span>
                    <span class="btn" title="Add to tasks">✅</span>
                    <span class="btn" title="Move to">➡</span>
                    <span class="btn" title="Labels">🏷</span>
                </div>
                <span class="btn" title="More">...</span>
            </div>
            <div class="flex">
                <p>indexes</p>
                <span class="btn" title="Newer">&lt;</span>
                <span class="btn" title="Older">></span>

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