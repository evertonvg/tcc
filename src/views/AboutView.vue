<template>
  <section>
    <header class="h-[50vh]  bg-cover bg-no-repeat bg-center overflow-hidden bg-gradient-to-b from-white to-header" ref="banner">
        <div class="container h-full mx-auto relative">
        </div>
    </header>
    <h1 class="text-center text-4xl p-6">Sobre o Otaku Stars</h1>
    <p class="container mx-auto text-left">
        Otaku Stars foi feito como projeto de TCC de Everton Vargas Guetierres para o curso de sistemas para 
        Internet do IFSUL campus Pelotas no ano de 2023.
        A idéia surgiu conversando com colegas da profissão sobre coisas que gostamos e projetos pessoais
        que cada um realizou.
        A motivação de criar a prataforma é poder dar ao público uma maneira de conhecer novos animes e poder avaliar
        animes que ja conhecem.

        <br>
        Como funciona o sistema de notas:
        <br>
        Cada temporada de um anime possui 4 notas: animação, personagens, história e trilha sonora, cada uma dessas
        podendo ir de 0 a 10, essas notas geram a nota total final da temporada através de uma média,
        ou seja, nota da animação, personagem, história e trilha sonora divido por 4.
        <br>
        A nota final da obra toda será dada pela media das notas de cada temporada.
        <br>
        Existem 3 tipos de avaliações que serão mostrados no site: nota da temporada, nota de todos os tempos e os mais avaliados.
        A nota da temporada só computarão avaliações dadas no periodo regente da temporada de animes do japão e da temporada atual do anime, enquanto
        a nota de todos os tempos computará todas temporadas desde o inicio ao fim. Os mais avaliados mostrará quais animes 
        possuem mais avaliações pelo público, sendo assim, considerado os mais populares.
        <br>
        Dicas de como melhorar o sistema de notas são bem vindos através dos links do rodapé no site.
    </p>
  </section>
</template>

<script>
export default {
    mounted(){
        this.$refs.banner.style.backgroundImage = `url(https://i.pinimg.com/originals/48/b0/08/48b00863d2110db05118c6b4eb9b2180.jpg)`
    }
}
</script>

<style>

</style>