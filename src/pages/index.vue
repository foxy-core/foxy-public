<template>
  <div>
    <UiBaseTypography class="text-center">
      <h1>Поздравляем!</h1>

      <p>Вы авторизованы и теперь можете творить любую дичь.</p>

      <blockquote>
        Проскролль и зацени какая красивая верхняя панелька
      </blockquote>

      <img
        src="~/assets/fox-gif-404.gif"
        :width="232"
        :height="176"
        class="inline"
      />

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas corporis
        mollitia laboriosam tempore amet quia. Provident ipsum eligendi culpa
        aliquam consequatur est, molestiae nostrum explicabo praesentium
        temporibus in laborum doloribus.
      </p>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas corporis
        mollitia laboriosam tempore amet quia. Provident ipsum eligendi culpa
        aliquam consequatur est, molestiae nostrum explicabo praesentium
        temporibus in laborum doloribus.
      </p>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas corporis
        mollitia laboriosam tempore amet quia. Provident ipsum eligendi culpa
        aliquam consequatur est, molestiae nostrum explicabo praesentium
        temporibus in laborum doloribus.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas corporis
        mollitia laboriosam tempore amet quia. Provident ipsum eligendi culpa
        aliquam consequatur est, molestiae nostrum explicabo praesentium
        temporibus in laborum doloribus.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas corporis
        mollitia laboriosam tempore amet quia. Provident ipsum eligendi culpa
        aliquam consequatur est, molestiae nostrum explicabo praesentium
        temporibus in laborum doloribus.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas corporis
        mollitia laboriosam tempore amet quia. Provident ipsum eligendi culpa
        aliquam consequatur est, molestiae nostrum explicabo praesentium
        temporibus in laborum doloribus.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas corporis
        mollitia laboriosam tempore amet quia. Provident ipsum eligendi culpa
        aliquam consequatur est, molestiae nostrum explicabo praesentium
        temporibus in laborum doloribus.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas corporis
        mollitia laboriosam tempore amet quia. Provident ipsum eligendi culpa
        aliquam consequatur est, molestiae nostrum explicabo praesentium
        temporibus in laborum doloribus.
      </p>
    </UiBaseTypography>

    <UiBaseButton class="mt-6 mx-auto" @click="signOut">Выйти :(</UiBaseButton>
  </div>
</template>

<script setup lang="ts">
  const authCookie = useCookie('auth')

  const goToSignUp = () => navigateTo('/sign-up')

  if (!authCookie.value) goToSignUp()

  const signOut = () => {
    authCookie.value = undefined
    goToSignUp()
  }
</script>
