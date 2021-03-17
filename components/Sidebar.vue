<template>
  <div>
    <header>
      <h1 class="title">
        <NuxtLink to="/" class="titleLink">
          <Logo class="logoImage" />
          <span class="titleText">遠隔療養者<br />モニタリングシステム</span>
        </NuxtLink>
      </h1>
    </header>
    <!--    <label class="selectTitle">保健所</label>-->
    <div class="selectContainer">
      <select v-model="selected" class="select" @change="handleChangeCenter">
        <option value="">保健所を選択</option>
        <option
          v-for="(center, index) in centers"
          :key="index"
          :value="center.centerId"
        >
          {{ center.centerName }}
        </option>
      </select>
    </div>
    <nav>
      <ul>
        <li class="navItem">
          <NuxtLink :to="`/center/${centerId}`" class="navLink">
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
import { Center } from '@/types/component-interfaces/nurse'

@Component({
  components: {
    Logo,
    UserIcon,
    LogoutIcon,
    HelpIcon,
  },
})
export default class Sidebar extends Vue {
  centers: Center[] = []
  selected = ''

  created() {
    if (authStore.user) {
      nursesStore.load(authStore.user.username).then((nurse) => {
        this.centers = nurse.manageCenters
      })
    } else {
      authStore.signOut()
      this.$router.push('/login')
    }
  }

  get centerId() {
    return this.$route.params.centerId
  }

  handleChangeCenter() {
    nursesStore.setCenter(this.selected)
    this.$router.push(`/center/${this.selected}`)
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
.logoImage {
  width: 38px;
  padding-top: 4px;
}
.titleText {
  font-size: 14px;
  color: $gray-2;
  padding-left: 12px;
}
.selectContainer {
  position: relative;
  width: 100%;
  margin-bottom: 16px;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid $gray-2;
  &::before {
    position: absolute;
    top: 50%;
    right: 0.8em;
    margin-top: -2px;
    width: 0;
    height: 0;
    padding: 0;
    content: '';
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid $gray-2;
    pointer-events: none;
  }
}
.select {
  width: 100%;
  cursor: pointer;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  background: transparent;
  box-shadow: none;
  appearance: none;
  font-size: 16px;
  padding: 8px 16px 8px 0;
  color: $light;
}
.navItem {
  padding: 16px 0;
}
.navLink {
  color: $gray-2;
  text-decoration: none;
  &.nuxt-link-exact-active {
    font-weight: 600;

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
