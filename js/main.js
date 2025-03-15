Vue.component('column', {
    props: {
        column:{
            type:Object,
            required:true
        },
        columnIndex:{
          type:Number,
          required:true
        },
        isFirstColumnBlock:{
            type:Boolean,
            default:false
        }
    },
    template: `
        <div class="column">
            <h2>{{column.title}} ({{column.cards.length}})</h2>
        </div>
    `,
    computed: {
    },
})
