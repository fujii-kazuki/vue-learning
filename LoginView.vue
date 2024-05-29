<template>
  <v-container fluid>
      <v-card width="600" class="mx-auto pa-5">
          <v-card-item>
              <div>
                  <div>
                      <v-form ref="form" class="pa-5 d-flex flex-column ga-5">
                          <v-text-field v-model="loginUser.schoolId"
                                        label="学校ID"
                                        variant="outlined"
                                        density="compact"
                                        required
                                        :rules="[rules.required]"
                                        ></v-text-field>
                          <v-text-field v-model="loginUser.studentId"
                                        label="児童ID"
                                        variant="outlined"
                                        density="compact"
                                        required
                                        :rules="[rules.required]"
                                        ></v-text-field>
                          <v-text-field v-model="loginUser.password"
                                        :type="showPassword ? 'text' : 'password'"
                                        label="パスワード"
                                        variant="outlined"
                                        density="compact"
                                        required
                                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append-inner="showPassword = !showPassword"
                                        :rules="[rules.required]"
                                        ></v-text-field>
                      </v-form>
                  </div>
              </div>
          </v-card-item>
          <v-card-actions class="justify-center">
              <v-btn variant="outlined"
                     width="100"
                     @click="login"
                     :disabled="isLoginBtnDisabled"
                     >ログイン</v-btn>
          </v-card-actions>
      </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth-store'
import LoginUser from '@/models/loginUser'

const emptyUser = new LoginUser("", "", "")
var loginUser = ref<LoginUser>(emptyUser)

const showPassword = ref(false)

// バリデーションルール
const rules = {
    // 入力必須の制約
    required: (value) => !!value || '必ず入力して下さい',
}

const isLoginBtnDisabled = computed(() => {
    return !loginUser.value.schoolId
        || !loginUser.value.studentId
        || !loginUser.value.password
})

onMounted(() => {
    console.log("onMounted!")
})

/**
 * ログインする。（ステータス保存処理を利用する）
 */
async function login() {
    await useAuthStore()
        .login(loginUser.value)
        .catch((err: Error) => {
            console.log(err)
        })
}
</script>
