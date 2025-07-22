<template>
  <div class="homepage-container">
    <header class="hero">
      <img v-if="frontmatter.heroImage" :src="$withBase(frontmatter.heroImage)" alt="Hero Image" class="hero-image">
      <h1 class="hero-title">{{ frontmatter.heroText || '标题' }}</h1>
      <p class="hero-tagline">{{ frontmatter.tagline || '标语' }}</p>
      <div class="actions">
        <a
            v-for="action in frontmatter.actions"
            :key="action.text"
            :href="$withBase(action.link)"
            :class="['action-button', action.type || '']"
        >
          {{ action.text }}
        </a>
      </div>
    </header>

    <main class="feature-grid">
      <a
          v-for="feature in frontmatter.features"
          :key="feature.title"
          :href="$withBase(feature.link)"
          class="feature-card"
      >
        <h3 v-if="feature.title">{{ feature.title }}</h3>
        <p v-if="feature.details">{{ feature.details }}</p>
      </a>
    </main>

    <div class="theme-default-content custom-content">
      <Content />
    </div>

    <footer v-if="frontmatter.footer" class="footer">
      {{ frontmatter.footer }}
    </footer>
  </div>
</template>

<script setup>
import { usePageFrontmatter } from '@vuepress/client'

const frontmatter = usePageFrontmatter()
</script>

<style scoped>
.homepage-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
}
.hero {
  text-align: center;
  padding: 3rem 0;
}
.hero-image {
  max-width: 200px;
  height: auto;
  margin: 0 auto 2rem;
}
.hero-title {
  font-size: 3rem;
  font-weight: 700;
}
.hero-tagline {
  font-size: 1.5rem;
  margin: 1rem auto;
  color: var(--c-text-light);
}
.actions {
  margin-top: 2.5rem;
}
.action-button {
  display: inline-block;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  background-color: var(--c-brand);
  color: var(--c-bg);
  text-decoration: none;
  font-weight: 600;
  margin: 0.5rem;
  transition: background-color 0.2s ease;
}
.action-button.secondary {
  background-color: var(--c-bg-light);
  color: var(--c-text);
  border: 1px solid var(--c-brand);
}
.action-button:hover {
  opacity: 0.8;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem 0;
}
.feature-card {
  display: block;
  padding: 1.5rem;
  border: 1px solid var(--c-border);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  background-color: var(--c-bg-light);
}
.feature-card:hover {
  box-shadow: var(--c-shadow-2);
  border-color: var(--c-brand);
}
.feature-card h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 600;
  border-bottom: 0;
}
.feature-card p {
  color: var(--c-text-light);
}
.custom-content {
  padding: 2rem 0;
}
.footer {
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid var(--c-border);
  color: var(--c-text-lighter);
}
</style>