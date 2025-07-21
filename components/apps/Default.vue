<template>
  <div class="app-default">
    <div class="app-content">
      <div class="app-icon-large">📱</div>
      <h2>Application</h2>
      <p>This application is under development.</p>
      <div class="features">
        <h3>Coming soon features:</h3>
        <ul>
          <li>File management and analysis</li>
          <li>Web browsing</li>
          <li>Note taking and summaries</li>
          <li>Evidence collection</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.app-default {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $window-bg;
  color: $text-primary;
}

.app-content {
  text-align: center;
  max-width: 400px;
  padding: 2rem;

  .app-icon-large {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  h2 {
    margin-bottom: 1rem;
    color: $text-primary;
  }

  p {
    color: $text-secondary;
    margin-bottom: 2rem;
  }

  .features {
    text-align: left;

    h3 {
      color: $accent-blue;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 0.5rem 0;
        color: $text-secondary;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: '▶';
          position: absolute;
          left: 0;
          color: $accent-blue;
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>