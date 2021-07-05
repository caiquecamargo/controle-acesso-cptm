<template>
  <the-main class="flex flex-col pt-14 lg:pt-20 pb-4 px-4">
    <the-search-w-button @onSearch="onSearch" />
    <div
      v-if="search"
      class="flex justify-between items-center flex-wrap gap-2 mt-2"
    >
      <the-search-result :search="search" />
      <button
        class="rounded bg-secondary text-white text-sm py-1 px-2"
        @click.prevent="showAll"
      >
        Mostrar todos
      </button>
    </div>
    <e-list-users
      class="mt-4"
      v-if="users.length"
      :users="users"
      @on-click="onClick"
    />
    <page-loader-animation ref="loader" v-show="!users.length" />
  </the-main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import TheMain from "../components/shared/main/TheMain.vue";
import TheSearchResult from "../components/shared/search/TheSearchResult.vue";
import { User } from "../models/IUser";
import { UserService } from "../services/UserService";
import EListUsers from "../components/app/EListUsers.vue";
import PageLoaderAnimation from "../components/shared/loaders/PageLoaderAnimation.vue";
import { useRouter } from "vue-router";
import TheSearchWButton from "../components/shared/search/TheSearchWButton.vue";

export default defineComponent({
  components: {
    TheMain,
    TheSearchResult,
    EListUsers,
    PageLoaderAnimation,
    TheSearchWButton,
  },
  setup() {
    const search = ref("");
    const users = ref<User[]>([]);
    const loader = ref<InstanceType<typeof PageLoaderAnimation>>();
    const router = useRouter();

    const onSearch = (text: string) => {
      search.value = text;
    };

    const onClick = (user: User) => {
      router.push({ name: "User", params: { id: user.cardId } });
    };

    const getUsers = async () => {
      users.value = [];
      loader.value?.animate();
      if (search.value)
        users.value = await UserService.findByName(search.value);
      else users.value = await UserService.findAll();

      loader.value?.stop();
    };

    const showAll = () => {
      search.value = "";
      getUsers();
    };

    onMounted(() => {
      getUsers();
    });

    watch(
      () => search.value,
      () => {
        if (search.value) getUsers();
      }
    );

    return {
      onSearch,
      onClick,
      getUsers,
      showAll,
      search,
      users,
      loader,
    };
  },
});
</script>

<style lang="postcss"></style>
