<style lang="scss" scoped>

</style>
<template>
    <div class="yxl-guide">
        <canvas ref="guide"></canvas>
    </div>
</template>
<script>
export default {
  name: "guide",
  data () {
    return {
      canvas: null,
      context: null,
      particles: [],
      microparticles: []
    }
  },
  methods: {
      clear() {
          let grd = this.canvas.createRadialGradient(this.canvas.width / 2, this.canvas.height / 2, 0, this.canvas.width / 2, this.canvas.height / 2, this.canvas.width);
          grd.addColorStop(0, "rgba(82,42,114,1)");
          grd.addColorStop(1, "rgba(26,14,4,0)");
          // Fill with gradient
          this.canvas.globalAlpha = 0.16;
          this.canvas.fillStyle = grd;
          this.canvas.fillRect(0, 0, this.canvas.width, this.canvas.height);
      },
      particle (canvas) {
          let random = Math.random,
              random1 = Math.random1
      }
  },
  mounted () {
    this.canvas = this.$refs['guide'];
    this.context = this.canvas.getContext('2d');
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = window.screen.height; 
  }
}
</script>

