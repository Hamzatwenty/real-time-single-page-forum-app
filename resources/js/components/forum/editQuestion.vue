<template>
    <v-container fluid>
        <v-card>
            <v-form @submit.prevent="update">
                <v-text-field
                        label="Title"
                        v-model="form.title"
                        type="text"
                        required>
                </v-text-field>
                <vue-simplemde v-model="form.body" ref="markdownEditor"/>
                <v-card-actions>
                    <v-btn icon small type="submit">
                        <v-icon color="teal">save</v-icon>
                    </v-btn>
                    <v-btn icon small @click="cancel">
                        <v-icon color="black">cancel</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "editQuestion",
        data() {
            return {
                form: {
                    title: null,
                    body: null
                }
            }
        },
        methods: {
            cancel() {
                EventBus.$emit('cancelEditing');
            },
            update(){
                axios.patch(`/realtimeApp/public/api/question/${this.data.slug}`,this.form)
                    .then(res => this.cancel())
            }
        },
        props: ['data'],
        mounted() {
            this.form = this.data
        }
    }
</script>

<style scoped>

</style>