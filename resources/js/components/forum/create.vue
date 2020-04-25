<template>
    <v-container>
        <v-form @submit.prevent="create">
            <v-text-field label="Title" v-model="form.title" type="text" required></v-text-field>
            <v-select :items="categories"  v-model="form.category_id" item-value="id" item-text="name" label="Category" autocomplete></v-select>
             <vue-simplemde v-model="form.body" ref="markdownEditor" />
            <v-btn color="success" class="white--text" type="submit">Create</v-btn>
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
                .catch(error => this.errors = error.response.data.error)
            }
        },
    }
</script>

<style scoped>

</style>