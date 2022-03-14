<template>
  <div class="main_bg">
    <section class="php" @click.self="open = false">
      <h1 class="header">PHP</h1>
      <div class="mt-4">
        <span tabindex="0" class="inline-block w-40 font-primary font-medium"
          >PHP Version</span
        >
        <div
          class="custom-select inline-block w-44"
          :tabindex="tabindex"
          @blur="open = false"
        >
          <div
            class="selected bg-gray-200"
            :class="{ open: open }"
            @click.self="open = !open"
          >
            {{ showSelected }}
          </div>
          <div class="items mt-2" :class="{ selectHide: !open }">
            <div
              v-for="(option, i) of options"
              :key="i"
              @click="
                selected = option;
                open = false;
                $emit('input', option);
              "
              class="hover:bg-gray-100"
            >
              <p
                v-if="
                  (selected == '' && option != currentPHP) ||
                    (selected != '' && option != selected)
                "
              >
                {{ option }}
              </p>
            </div>
          </div>
        </div>
        <button
          class="ml-10 bg-green-500 py-3 px-4 text-white rounded font-medium text-xl"
          v-if="showUpdateButton"
          @click="updatePhpVersion"
        >
          Update
        </button>
      </div>
    </section>
    <hr class="w-100 wl-20" />
    <section class="mt-4">
      <h2 class="text-3xl font-bold mb-4">PHP INI Settings</h2>
      <div class="grid-cols-2 grid">
        <div>
          <div class="settings">
            <label class="phplabel" for="timezone">Date Timezone</label>
            <input type="text" class="phpinput" id="timezone" />
          </div>
          <div class="settings">
            <label for="maxET" class="phplabel">Max Execution Time</label>
            <input
              type="number"
              class="phpinput"
              id="maxET"
              v-model="php['MaxExecutionTime']"
            />
            <span class="phptype">Seconds</span>
          </div>
          <div class="settings">
            <label for="maxFU" class="phplabel">Max File Upload</label>
            <input
              type="number"
              class="phpinput"
              id="maxFU"
              v-model="php['MaxFileUploads']"
            />
          </div>
          <div class="settings">
            <label for="maxIT" class="phplabel">Max Input Time</label>
            <input
              type="number"
              class="phpinput"
              id="maxIT"
              v-model="php['MaxInputTime']"
            />
            <span class="phptype">Seconds</span>
          </div>
          <div class="settings">
            <label for="maxIV" class="phplabel">Max Input Vars</label>
            <input
              type="number"
              class="phpinput"
              id="maxIV"
              v-model="php['MaxInputVars']"
            />
          </div>
          <div class="settings">
            <label for="memoryLimit" class="phplabel">Memory Limit</label>
            <input
              type="number"
              class="phpinput"
              id="memoryLimit"
              v-model="php['MemoryLimit']"
            />
            <span class="phptype">MB</span>
          </div>
        </div>
        <div>
          <div class="settings">
            <label for="postmax" class="phplabel">Post Max Size</label>
            <input
              type="number"
              class="phpinput"
              id="postmax"
              v-model="php['PostMaxSize']"
            />
            <span class="phptype">MB</span>
          </div>
          <div class="settings">
            <label for="sessionCL" class="phplabel"
              >Session Cookie Lifetime</label
            >
            <input
              type="number"
              class="phpinput"
              id="sessionCL"
              v-model="php['SessionCookieLifetime']"
            />
            <span class="phptype">Seconds</span>
          </div>
          <div class="settings">
            <label for="sessionGC" class="phplabel"
              >Session Gc Maxlifetime</label
            >
            <input
              type="number"
              class="phpinput"
              id="sessionGc"
              v-model="php['SessionGcMaxlifetime']"
            />
            <span class="phptype">Seconds</span>
          </div>
          <div class="settings">
            <label for="uploadMF" class="phplabel">Upload Max Filesize</label>
            <input
              type="number"
              class="phpinput"
              id="uploadMF"
              v-model="php['UploadMaxFilesize']"
            />
            <span class="phptype">MB</span>
          </div>
          <div class="settings">
            <label for="shortOT" class="phplabel">Short Open Tag</label>
            <input
              type="checkbox"
              class="phpinput"
              id="shortOT"
              v-model="php['ShortOpenTag']"
              true-value="On"
              false-value="Off"
            />
          </div>
        </div>
      </div>
      <button
        class="float-right bg-blue-700 text-white px-4 py-3 text-lg font-medium rounded"
        @click="updatePhpIni"
      >
        Update
      </button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ["lsphp74", "lsphp73", "lsphp80"],
      open: false,
      tabindex: 1,
      selected: "",
      showUpdateButton: false,
      php: "",
      sot: "",
    };
  },
  computed: {
    currentPHP() {
      return this.$store.state.currentSite.php;
    },
    showSelected() {
      if (this.selected == "") {
        return this.currentPHP;
      } else {
        return this.selected;
      }
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
      fetch(
        "http://localhost/site/" + this.$route.params.siteid + "/changePHP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            php: this.selected,
            serverid: this.$store.state.currentSite.serverId,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.$store.commit("setCurrentPHP", this.selected);
            this.showUpdateButton = false;
          }
        });
    },
    getPHPini() {
      fetch(
        "http://localhost/site/" + this.$route.params.siteid + "/getPHPini",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            this.php = data;
          }
        });
    },
    updatePhpIni() {
      fetch(
        "http://localhost/site/" + this.$route.params.siteid + "/updatePhpIni",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            php: this.php,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log("Error occured");
            return;
          } else {
            alert("update successfull");
          }
        });
    },
  },
  created() {
    this.getPHPini();
  },
};
</script>

<style>
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
