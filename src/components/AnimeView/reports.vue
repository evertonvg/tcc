<template>

    <div  id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 w-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen bg-lightblue flex items-center justify-center" >
        <div class="relative w-full h-full max-w-2xl md:h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Reportar Comentário
                    </h3>
                    <button @click="emitReport" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only" >Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Conte-nos o que o comentário abaixo possui de errado:
                    </p>
                    
                    <p  class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <cite class="font-bold">"{{ reportComent }}"</cite>
                    </p>
                    <div>
                        <label for="selectreport" class="w-full text-left">
                            selecione uma categoria
                        </label>
                        <select v-model="categoryreport" id="selectreport" class="w-full border rounded-sm h-12">
                            <option value="Racismo/Xenofobia/Transfobia/Homofobia">
                                Racismo/Xenofobia/Transfobia/Homofobia
                            </option>
                            <option value="Ódio direcionado a alguém especififo">
                                Ódio direcionado a alguém especififo
                            </option>
                            <option value="Ofensas e xingametos">
                                Ofensas e xingametos / palavras de baixo calão
                            </option>
                            <option value="Apologia as drogas ou automutilação">
                                Apologia as drogas ou automutilação
                            </option>
                            <option value="Outro">
                                Outro
                            </option>
                        </select>
                    </div>
                    <textarea
                        id="report"
                        name="report"
                        v-model="textreportComp"
                        :class="[
                        `w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`,
                        ]"
                    ></textarea>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button class="btn disabled:bg-gray" @click="sendreport">
                        Enviar report
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'reports-vue',
        props:['report','sendreport','textreport','reportComent','categoryreportprop'],
        emits: ['update:report','sendreportemit','update:textreport','update:categoryreportprop'],
        data(){
            return {
                textreportComp:'',
                categoryreport:''
            }
        },
        watch:{
            textreportComp(){
                this.$emit('update:textreport', this.textreportComp)
            },
            categoryreport(){
                this.$emit('update:categoryreportprop', this.categoryreport)
            }
        },
        methods:{
            emitReport(){
                this.$emit('update:report', !this.report)
            }
        }
    }
</script>