<template>
  <div class="main_bg">
    <section class="php">
      <h1 class="header">PHP</h1>
      <div class="px-5 pb-5 flex flex-row items-center">
        <p class="inline-block font-primary font-medium mr-2">PHP Version</p>
        <a-select
          ref="select"
          v-bind:value="selected"
          style="width: 120px"
          :options="options"
          :disabled="selectDisabled"
          :loading="selectDisabled"
        ></a-select>
        <div class="vld-parent">
          <button
            class="px-2 py-1 ml-2 rounded bg-indigo-700 text-white vld-parent"
            v-if="showUpdateButton && !selectDisabled"
            @click="updatePhpVersion"
          >
            Update
          </button>
        </div>
      </div>
    </section>
    <tab-view>
      <TabPanel header="PHP INI Settings"><PhpIni></PhpIni></TabPanel>
      <TabPanel header="PHP Settings"><PhpSettings></PhpSettings></TabPanel>
    </tab-view>
  </div>
</template>

<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { Select } from "ant-design-vue";
import "ant-design-vue/lib/select/style/index.css";

import { useToast } from "vue-toastification";
import PhpIni from "./PhpIni.vue";
import PhpSettings from "./PhpSettings.vue";
export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  components: {
    ASelect: Select,
    TabPanel,
    TabView,
    PhpIni,
    PhpSettings,
  },
  data() {
    return {
      options: [
        {
          value: "lsphp72",
          label: "lsphp72",
        },
        {
          value: "lsphp73",
          label: "lsphp73",
        },
        {
          value: "lsphp74",
          label: "lsphp74",
        },
        {
          value: "lsphp80",
          label: "lsphp80",
        },
      ],
      selectDisabled: false,
      selected: null,
      showUpdateButton: false,
    };
  },
  computed: {
    currentPHP() {
      return this.$store.state.currentSite.php;
    },
  },
  watch: {
    selected() {
      if (this.selected != "") {
        if (this.selected != this.currentPHP) {
          this.showUpdateButton = true;
        } else {
          this.showUpdateButton = false;
        }
      }
    },
  },
  methods: {
    updatePhpVersion() {
      this.selectDisabled = true;
      this.$axios
        .post(
          "/site/" + this.$route.params.siteid + "/changePHP",
          {
            php: this.selected,
            serverid: this.$store.state.currentSite.serverId,
          }
        )
        .then(() => {
          this.$store.commit("setCurrentPHP", this.selected);
          this.showUpdateButton = false;
          this.toast.success("PHP version changed");
        })
        .catch(() => {
          this.toast.error("Failed to update PHP version");
        })
        .finally(() => {
          this.selectDisabled = false;
        });
    },
  },
  created() {
    this.selected = this.$store.state.currentSite.php;
  },
};
</script>

<style>
.settings {
  padding-top: 10px;
}

.anticon-spin {
  color: darkblue;
}

.phplabel {
  width: 30rem;
}

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 30px;
  font-size: var(--font-size-primary);
}

.custom-select .selected {
  border-radius: 3px;
  border: 1px solid #666666;
  color: black;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid blue;
  border-radius: 3px;
}

.ant-btn-primary {
  background: #4547a9 !important;
}

.ant-switch {
  background: rgba(0, 0, 0, 0.25) !important;
}
.ant-switch-checked {
  background: #4547a9 !important;
}
/* .custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
} */

.custom-select .items {
  /* border-radius: 3px; */
  /* overflow: hidden; */
  border: 1px solid blue;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: black;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  /* background-color: dimgrey; */
}

.selectHide {
  display: none;
}
</style>
