<template>
  <div>
    <header>
      <h1 class="title">
        <NuxtLink to="/" class="titleLink">
          <span>
            <Logo />
          </span>
          <span class="titleText">遠隔療養者<br />モニタリングシステム</span>
        </NuxtLink>
      </h1>
    </header>
    <nav>
      <ul class="navList">
        <li v-for="(item, index) in items" :key="index" class="navItem">
          <NuxtLink :to="item.link" class="navLink">
            <span class="navIcon">
              <svg :is="item.icon" aria-hidden="true" />
            </span>
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <footer class="footer">
      <div class="navItem">
        <NuxtLink to="/help" class="navLink">
          <span class="navIcon">
            <HelpIcon aria-hidden="true" />
          </span>
          ヘルプ
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '@/static/logo.svg'
import ListIcon from '@/static/icon-list.svg'
import GraphIcon from '@/static/icon-graph.svg'
import HelpIcon from '@/static/icon-help.svg'

type Item = {
  icon: string
  title: string
  link: string
}

export default Vue.extend({
  components: {
    Logo,
    ListIcon,
    GraphIcon,
    HelpIcon,
  },
  computed: {
    items(): Item[] {
      return [
        {
          icon: 'ListIcon',
          title: 'データ一覧',
          link: 'list',
        },
        {
          icon: 'GraphIcon',
          title: '患者表示',
          link: 'patient',
        },
        {
          icon: 'GraphIcon',
          title: '患者登録',
          link: 'register',
        },
      ]
    },
  },
})
</script>

<style lang="scss" scoped>
.title {
  margin: 0 0 80px;
}
.titleLink {
  display: flex;
  align-items: center;
  text-decoration: none;
  &:focus {
    outline: dotted $gray-2 1px;
  }
}
.titleText {
  font-size: 14px;
  color: $gray-2;
  padding-left: 12px;
}
.navList {
  list-style: none;
  padding: 0;
}
.navItem {
  padding: 16px 0;
}
.navLink {
  color: $gray-2;
  text-decoration: none;
  &.nuxt-link-exact-active {
    font-weight: bold;

    &:link,
    &:hover,
    &:visited,
    &:active {
      color: $light;
    }
    &:focus {
      color: $light;
      outline: dotted $gray-2 1px;
    }
  }
}
.navIcon {
  padding-right: 16px;
  svg {
    fill: currentColor;
  }
}
.footer {
  margin-top: 260px;
}
</style>
