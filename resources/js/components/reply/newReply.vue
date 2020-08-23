<template>
    <div class="mt-4">
        <vue-simplemde v-model="body" ref="markdownEditor" />
        <v-btn dark color="green" @click="submit">
            Reply
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "newReply",
        props:['questionSlug'],
        data(){
            return{
                body:null
            }
        },
        methods:{
            submit(){
                axios.post(`/realtimeApp/public/api/question/${this.questionSlug}/reply`,{body:this.body})
                    .then(res => {
                        this.body = ''
                        EventBus.$emit('newReply',res.data.reply)
                        window.scrollTo(0,0)
                    })
            }
        }
    }
</script>

<style scoped>

</style>