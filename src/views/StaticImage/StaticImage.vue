<!--<template>-->
<!--  <div class="image-page">-->
<!--    <img class="logo" src="../../assets/ttc.png" alt="Tornado Cash Logo" />-->
<!--    <p class="tagline">Non-custodial anonymous transactions on Ethereum</p>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'StaticImage'-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--  .image-page {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    align-items: center;-->
<!--    justify-content: center;-->
<!--    height: 100vh;-->
<!--    background-color: #221515; /* 221515 Adjust the background color if needed */-->
<!--  }-->

<!--  .logo {-->
<!--    max-width: 60%; /* Adjust the size if needed */-->
<!--    margin-bottom: 1rem;-->
<!--  }-->

<!--  .tagline {-->
<!--    color: #ffffff;-->
<!--    font-size: 1.5rem; /* Adjust the size if needed */-->
<!--    text-align: center;-->
<!--    margin-top: 0;-->
<!--  }-->
<!--</style>-->

<template>
  <div class="app-container">
    <img :style="imageStyle" src="../../assets/ttc.png" alt="Responsive Image" style="width: 100%;"/>
    <p class="tagline">Non-custodial anonymous transactions on Ethereum</p>
    <!-- 其他内容 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    imageStyle() {
      if (this.windowWidth < 600) {
        return {
          width: '100%',
          height: 'auto',
        };
      } else if (this.windowWidth >= 600 && this.windowWidth <= 900) {
        return {
          width: '100%',
          height: 'auto',
        };
      } else {
        return {
          width: '75%',
          height: 'auto',
        };
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>

<style scoped>
  .image-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #221515; /* 221515 Adjust the background color if needed */
  }

  .imageStyle {
    max-width: 60%; /* Adjust the size if needed */
    margin-bottom: 1rem;
  }

  .tagline {
    color: #131212;
    font-size: 1.5rem; /* Adjust the size if needed */
    text-align: center;
    margin-top: 0;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* Adjust the styles based on your layout needs */
  }
</style>
