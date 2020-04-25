<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">
                    <router-link :to="data.path">
                        {{data.title}}
                    </router-link>
                </h3>
                <div class="grey--text">
                    {{data.user}} said {{data.created_at}}
                </div>
            </div>
        </v-card-title>

        <v-card-text v-html="body">
        </v-card-text>
    </v-card>
</template>

<script>
    import md from 'marked';
    export default {
        props:['data'],
        computed:{
            body(){
                return md(this.data.body);
            }
        }
    }
</script>

<style scoped>

</style>