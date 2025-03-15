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
        canAddCard(){
            return his.columnIndex === 0 && this.column.cards.length < 3 && !this.isFirstColumnBlocked;
        }
    },
})
Vue.component('cardTask', {
    props: {
      card: {
          type: Object,
          required:true
      },
      cardIndex: {
          type:Number,
          required:true
      },
      isFirstColumnBlock: {
          type:Boolean,
          default:false
      }
    },
    template: `
        <div class="card">
            <h3>{{card.title}}</h3>
            <input type="text" placeholder="Название карточки">
            <div>
                <div class="task">
                    <label>
                        <input type="checkbox">
                        <span>{{task.text}}</span>
                        <input type="text" placeholder="Введиде задачу">
                    </label>
                    <button>Сохранить</button>
                </div>
            </div>
            <button>Добавить пункт</button>
            <button>Сохранить заголовок</button>
            <p>Завершено: {{card.completedAt}}</p> 
        </div>
    `,
    methods: {
        addTask() {
            this.card.tasks.push({ text: '', completed: false, isEditing: true });
        },
        saveTask(taskIndex){
            this.card.tasks[taskIndex].isEditing = false;
            this.saveData();
        },
        saveCardTitle(){
            if (this.card.newTitle) {
                this.card.title = this.card.newTitle;
                this.card.isEditing = false;
                this.saveData();
            }
        },
        saveData(){
            this.$emit('save-data');
        }
    },
    computed: {
        canAddTask(){
            return !this.card.completedAt && this.card.tasks.length < 5 && !this.isFirstColumnBlock;
        }
    }
})
const app = new Vue({
    el: '#app',
    data(){
        return {
            columns: JSON.parse(localStorage.getItem('columns')) || [
                { title: "New", cards: [] },
                { title: "In process", cards: [] },
                { title: "Done", cards: [] }
            ]
        }
    }
})
