<template>
  <div class="canvas" ref="canvas" @keydown="onKeyDown" @keyup="onKeyUp" tabindex="0"
      :style="{ backgroundColor: options.canvas.backgroundColor}">
  </div>
</template>

<script>
import anime from 'animejs';
import logger from '@/utils/logger';
import keycodeToChar from '@/utils/keycode-to-char';
import EmojiCursor from '@/effects/emojiCursor';

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      options: {
        canvas: {
          backgroundColor: 'cornflowerblue',
          padding: 200,
        },
        text: {
          disappearTimeout: 5000,
          style: {
            color: '#fff',
            fontSize: '200px',
            fontWeight: '900',
          },
          animation: {
            opacityIn: [0, 1],
            scaleIn: [0.2, 1],
            scaleOut: 6,
            durationIn: 1600,
            durationOut: 1200,
            delay: 500,
          }
        },
      },
    };
  },
  mounted() {
    logger.debug('App.mounted');
    const canvas = this.$refs.canvas;
    logger.debug('el = {0}', canvas.nodeName);
    EmojiCursor({ element: canvas, size: '120px' });
  },
  methods: {

    onKeyDown(event) {
      logger.debug('App.onKeyDown: keyCode = {0}', event.keyCode);
      const text = keycodeToChar(event.keyCode);
      logger.debug('text = {0}', text);
      this.addText(text);
    },

    onKeyUp(event) {
      logger.debug('App.onKeyUp: {0}', event.keyCode);
      const text = keycodeToChar(event.keyCode);
      logger.debug('text = {0}', text);
    },

    addText(text) {
      logger.debug('App.addText: text = {0}', text);
      const el = document.createElement('span');
      el.setAttribute('class', 'text');
      el.innerHTML = text;
      const chopts = this.options.text;
      el.style.color = chopts.style.color;
      el.style.fontSize = chopts.style.fontSize;
      el.style.fontWeight = chopts.style.fontWeight;

      const pos = this.getRandomPosition(text);
      logger.debug('Add a text at: {0}', pos);
      el.style.left = `${pos.x}px`;
      el.style.top = `${pos.y}px`;
      const canvas = this.$refs.canvas;
      canvas.appendChild(el);
      setTimeout(() => {
        logger.debug('Character {0} was destroyed.', el.innerHTML);
        canvas.removeChild(el);
      }, chopts.disappearTimeout);
      const aniopts = chopts.animation;
      anime.timeline({ loop: false })
        .add({
          targets: el,
          opacity: aniopts.opacityIn,
          scale: aniopts.scaleIn,
          duration: aniopts.durationIn,
        }).add({
          targets: el,
          opacity: 0,
          scale: aniopts.scaleOut,
          duration: aniopts.durationOut,
          easing: 'easeInExpo',
          delay: aniopts.delay,
        });
    },

    getRandomPosition(text) {
      logger.debug('App.getRandomPosition: text = {0}', text);
      const opts = this.options.canvas;
      const canvas = this.$refs.canvas;
      const xMax = canvas.clientWidth - 2 * opts.padding;
      const yMax = canvas.clientHeight - 2 * opts.padding;
      logger.debug('max = {0}, {1}', xMax, yMax);
      const x = Math.floor(Math.random() * xMax) + opts.padding;
      const y = Math.floor(Math.random() * yMax) + opts.padding;
      return { x, y };
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
.canvas {
  width: 100vw;
  height: 100vh;
}
.text {
  position: absolute;
}
</style>
