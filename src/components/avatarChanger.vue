<template>
  <div>
    <v-dialog transition="dialog-bottom-transition" scrollable max-width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="#151F30" dark v-bind="attrs" v-on="on"
          >Cambiar Avatar</v-btn
        >
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="#151F30" dark>Elije tu avatar</v-toolbar>

          <v-card-text style="max-height: 500px">
            <v-container>
              <v-row>
                <v-col
                  v-for="(avatar, index) in avatars"
                  cols="6"
                  sm="4"
                  md="3"
                  :key="index"
                >
                  <div
                    :style="{ backgroundImage: `url(${avatar.url})` }"
                    class="avatarIcon"
                    :class="selectedAvatar == index ? 'selected' : ''"
                    @click="selectAvatar(index)"
                  ></div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
            <v-btn
              text
              @click="
                confirmAvatar();
                dialog.value = false;
              "
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectedAvatar: 0,
        avatars: [
          {
            url: "https://i.ibb.co/7S1s3xZ/4043260-avatar-male-man-portrait-113269.png",
          },
          {
            url: "https://i.ibb.co/b7RNjL1/4043232-avatar-batman-comics-hero-113278.png",
          },
          {
            url: "https://i.ibb.co/YPwBLYj/4043251-avatar-female-girl-woman-113291.png",
          },
          {
            url: "https://i.ibb.co/Zc4dSH5/4043270-avatar-joker-squad-suicide-woman-113256.png",
          },
          {
            url: "https://i.ibb.co/tHh1xYm/4043249-avatar-geisha-japanese-woman-113275.png",
          },
          {
            url: "https://i.ibb.co/svWBPfv/4043241-builder-helmet-worker-113249.png",
          },
          {
            url: "https://i.ibb.co/C8CvsTL/4043268-alien-avatar-space-ufo-113272.png",
          },
          {
            url: "https://i.ibb.co/FqFFQRQ/4043243-actor-chaplin-comedy-man-113289.png",
          },
          {
            url: "https://i.ibb.co/T0RKj35/4043238-avatar-boy-kid-person-113284.png",
          },
          {
            url: "https://i.ibb.co/HVtXdXZ/4043250-avatar-child-girl-kid-113270.png",
          },
          {
            url: "https://i.ibb.co/Fzqm0gs/4043279-afro-avatar-male-man-113244.png",
          },
          {
            url: "https://i.ibb.co/g75Wm50/4043259-avatar-hindi-indian-woman-113247.png",
          },
          {
            url: "https://i.ibb.co/GCDqh75/4043240-avatar-bad-breaking-chemisrty-heisenberg-113279.png",
          },
          {
            url: "https://i.ibb.co/CQ2Dr7Z/4043261-artist-avatar-marilyn-monroe-113252.png",
          },
          {
            url: "https://i.ibb.co/1K8tb2Y/4043253-friday-halloween-jason-movie-113258.png",
          },
          {
            url: "https://i.ibb.co/2gGymMz/4043233-anime-away-face-no-nobody-spirited-113254.png",
          },
        ],
      };
    },
    methods: {
      selectAvatar(index) {
        this.selectedAvatar = index;
      },
      confirmAvatar() {
        this.$emit("avatarChange", this.avatars[this.selectedAvatar].url);
      },
    },
  };
</script>
<style>
  .avatarIcon {
    min-height: 140px;
    width: 140px;
    margin: 0 auto;
    background-size: contain;
    background-position: center;
    border-radius: 508px;
    cursor: pointer;
  }
  .selected {
    border: 4px solid var(--highlight-color);
  }
</style>
