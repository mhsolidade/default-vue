import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])

export const layoutMenuMethods = mapActions('layoutMenu', [
  'toggleActivateMenu',
  'setActivateMenu',
])

export const layoutMenuComputed = {
  ...mapGetters('layoutMenu', ['activateMenu']),
  ...mapState('layoutMenu', ['links']),
}

export const alertComputde = {
  ...mapGetters('alert', ['active', 'text']),
}
export const alertMethods = mapActions('alert', ['newAlert'])

export const confirmationComputde = {
  ...mapGetters('confirmation', ['description', 'title', 'promise', 'active']),
}

export const confirmationMethods = mapActions('confirmation', [
  'setConfirmation',
  'cancel',
])
