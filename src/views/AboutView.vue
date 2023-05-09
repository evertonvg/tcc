<template>
  <section >
    <header class="lg:h-[50vh] h-80  bg-cover bg-no-repeat bg-center overflow-hidden bg-gradient-to-b from-white to-header" ref="banner">
        <div class="container h-full mx-auto relative">
        </div>
    </header>
    <div class="container mx-auto bg-white p-7 mt-6">
      <h1 class="text-center text-4xl p-6">Sobre o Otaku Stars</h1>
      <p class="container mx-auto text-left">
        Otaku Stars foi feito como projeto de TCC de Everton Vargas Guetierres para o curso de sistemas para 
        Internet do IFSUL campus Pelotas no ano de 2023.
        A idéia surgiu conversando com colegas da profissão sobre coisas que gostamos e projetos pessoais
        que cada um realizou.
        A motivação de criar a plataforma é poder dar ao público uma maneira de conhecer novos animes e poder avaliar
        animes que ja conhecem.

        <br>
        Como funciona o sistema de notas:
        <br>
        Cada temporada de um anime possui 4 notas: 
        <span class="flex gap-2 flex-row-reverse items-start justify-end">
          animação <person fillColor="#E7711B" />
        </span>
        <span class="flex gap-2 flex-row-reverse justify-end">
          personagens <graphic fillColor="#E7711B" />
        </span>
        <span class="flex gap-2 flex-row-reverse justify-end" >
          história <history fillColor="#E7711B" />
        </span>
        <span class="flex gap-2 flex-row-reverse justify-end">
          trilha sonora <music fillColor="#E7711B" />
        </span>
        cada uma dessas
        podendo ir de 6 a 10, representados pelas estrelas clicaveis na tela de avaliação. Essas notas geram a nota total final do usuário da temporada através de uma média,
        ou seja, nota da animação, personagem, história e trilha sonora divido por 4.
        <br>
        A nota final da temporada será feita pela soma de todas as notas dos usuários, duvidido pelo número total de
        usuários que deram notas.
        <br>
        
        <br>
        Dicas de como melhorar o sistema de notas são bem vindos por contato através dos links do rodapé no site.
    </p>
    </div>
    
  </section>
</template>

<script>
export default {
    mounted(){
        this.$refs.banner.style.backgroundImage = `url(https://www.kindpng.com/picc/m/94-945767_transparent-lucky-star-konata-png-cartoon-png-download.png)`
        document.title = "Otaku Stars - Sobre";
    }
}
</script>

<style>

</style>