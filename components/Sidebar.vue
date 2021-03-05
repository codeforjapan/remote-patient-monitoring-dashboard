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
      <ul>
        <li class="navItem">
          <NuxtLink :to="`/centers/${centerId}`" class="navLink">
            <span class="navIcon">
              <UserIcon aria-hidden="true" />
            </span>
            <span>患者一覧</span>
          </NuxtLink>
        </li>
        <li class="navItem">
          <button class="navButton" @click="handleLogout">
            <span class="navIcon">
              <LogoutIcon aria-hidden="true" />
            </span>
            <span>ログアウト</span>
          </button>
        </li>
      </ul>
    </nav>
    <footer class="footer">
      <div class="navItem">
        <NuxtLink to="/help" class="navLink">
          <span class="navIcon">
            <HelpIcon aria-hidden="true" />
          </span>
          <span>ヘルプ</span>
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Logo from '@/static/logo.svg'
import UserIcon from '@/static/icon-user.svg'
import LogoutIcon from '@/static/icon-logout.svg'
import HelpIcon from '@/static/icon-help.svg'
import { authStore, nursesStore } from '@/store'

@Component({
  components: {
    Logo,
    UserIcon,
    LogoutIcon,
    HelpIcon,
  },
})
export default class Sidebar extends Vue {
  get centerId() {
    return nursesStore.getCenterId
  }

  handleLogout() {
    authStore.signOut()
    this.$router.push('/login')
  }
}
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
.navButton {
  display: flex;
  color: $gray-2;
  background: none;
  padding: 0;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    color: $light;
    outline: dotted $gray-2 1px;
  }
}
.navIcon {
  display: inline;
  padding-right: 16px;
  vertical-align: bottom;
  svg {
    fill: currentColor;
  }
}
.footer {
  margin-top: 260px;
}
</style>
