<template>
    <v-container>
        <v-form @submit.prevent="create">
            <span class="red--text" v-if="errors.title">{{errors.title[0]}}</span>
            <v-text-field label="Title" v-model="form.title" type="text" required></v-text-field>
            <span class="red--text" v-if="errors.category_id">{{errors.category_id[0]}}</span>
            <v-select :items="categories"  v-model="form.category_id" item-value="id" item-text="name" label="Category" autocomplete></v-select>
            <span class="red--text" v-if="errors.body">{{errors.body[0]}}</span>
            <vue-simplemde v-model="form.body" ref="markdownEditor" />
            <v-btn color="success" class="white--text" type="submit" :disabled="disabled">Create</v-btn>
        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: "create",
        data(){
            return{
                form:{
                    title:null,
                    category_id:null,
                    body:null,
                },
                categories:[],
                errors:{}
            }
        },
        created(){
            axios.get('/realtimeApp/public/api/category')
            .then(res => this.categories = res.data.data)
        },
        methods:{
            create(){
                axios.post('/realtimeApp/public/api/question',this.form)
                .then(res => this.$router.push(res.data.path))
                .catch(error => this.errors = error.response.data.errors)
            }
        },

        computed:{
            disabled(){
              return   !(this.form.title && this.form.body && this.form.category_id)
            }
        }
    }
</script>

<style scoped>

</style>