<template>
    <v-container>
        <v-form @submit.prevent="submit">
            <v-text-field label="Category Name" v-model="form.name" type="text" required></v-text-field>
            <div class="red--text" v-if="errors.name">{{errors.name[0]}}</div>
            <v-btn type="submit" color="primary" v-if="editSlug">Update</v-btn>
            <v-btn type="submit" color="teal" v-else>Create</v-btn>
        </v-form>
        <v-card class="mt-2">
            <v-toolbar color="cyan" dark dense="">
                <v-toolbar-title>Categories</v-toolbar-title>
            </v-toolbar>

            <v-list>
                <div v-for="(category,index) in categories" :key="category.id">
                    <v-list-item>
                        <v-list-tile-action>
                            <v-btn icon small @click="edit(index)">
                                <v-icon color="orange">edit</v-icon>
                            </v-btn>
                            <v-btn icon small @click="destroy(category.slug,index)">
                                <v-icon color="red">delete</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content class="ml-1">
                            <v-list-tile-title>{{category.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-item>
                    <v-divider></v-divider>
                </div>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "createCategory",
        data() {
            return {
                form: {
                    name: null
                },
                categories: {},
                errors: {},
                editSlug: null
            }
        },
        created() {
            if (!User.admin()){
                this.$router.push('/realtimeApp/public/forum')
            }
            axios.get('/realtimeApp/public/api/category')
                .then(res => this.categories = res.data.data)
        },
        methods: {
            submit() {
                this.editSlug ? this.update() : this.create()
            },
            update(){
              axios.patch(`/realtimeApp/public/api/category/${this.editSlug}`,this.form)
                  .then(res => {
                      this.categories.unshift(res.data)
                      this.form.name = null
                      this.editSlug = null
                  })
            },
            create(){
                axios.post('/realtimeApp/public/api/category', this.form)
                    .then(res => {
                        this.categories.unshift(res.data.category);
                        this.form.name = null
                    })
                    .catch(error => this.errors = error.response.data.errors);
            },
            destroy(slug, index) {
                axios.delete(`/realtimeApp/public/api/category/${slug}`)
                    .then(res = this.categories.splice(index, 1))
            },
            edit(index) {
                this.form.name = this.categories[index].name
                this.editSlug = this.categories[index].slug
                this.categories.splice(index,1)
            }
        }
    }
</script>

<style scoped>

</style>