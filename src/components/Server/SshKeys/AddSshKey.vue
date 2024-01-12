<template>
  <div>
    <a-form
      :model="key"
      name="addKey"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      layout="vertical"
      id="addKey"
      :hideRequiredMark="true"
      :rules="rules"
      @submit="addKey"
    >
      <a-form-item
        label="Label"
        name="label"
        :labelCol="{ span: 12 }"
        :wrapperCol="{ span: 30 }"
        :validateStatus="fieldErrors['label'].status"
        :help="fieldErrors['label'].message"
      >
        <a-input
          v-model:value="key.label"
          placeholder="Label to identify ssh key"
        />
      </a-form-item>

      <a-form-item
        label="User"
        name="user"
        :labelCol="{ span: 12 }"
        :wrapperCol="{ span: 30 }"
        :validateStatus="fieldErrors['user'].status"
        :help="fieldErrors['user'].message"
      >
        <a-select
          v-model:value="key['user']"
          show-search
          placeholder="Select User"
          style="width: 200px"
          :options="users"
          :loading="loading['users']"
          :disabled="loading['users']"
          class="w-full"
        ></a-select>
      </a-form-item>
      <a-form-item
        label="Key"
        name="key"
        :labelCol="{ span: 12 }"
        :wrapperCol="{ span: 30 }"
        :validateStatus="fieldErrors['key'].status"
        :help="fieldErrors['key'].message"
      >
        <a-textarea
          v-model:value="key['key']"
          placeholder="SSH key"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Form } from "ant-design-vue";
const useForm = Form.useForm;
export default {
  data() {
    return {
      fieldErrors: {
        label: { status: undefined, message: undefined },
        user: { status: undefined, message: undefined },
        key: { status: undefined, message: undefined },
      },
      key: {
        label: '',
        key: '',
        user: undefined,
      },
      rules: {
        label: [
          {
            required: true,
            message: "Label is required",
          },
        ],
        user: [
          {
            required: true,
            message: "Please select user",
          },
        ],
        key: [
          {
            required: true,
            message: "Add SSH Key",
          },
        ],
      },
      users: [],
      loading: {},
    };
  },
  created() {
    this.loading["users"] = true;
    this.$axios
      .get("/server/" + this.$route.params.serverid + "/users")
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          console.log(this);
          this.users.push({ value: res.data[i].user, label: res.data[i].user });
        }
        this.loading["users"] = false;
      })
      .catch(() => {
        this.$toast.error("Failed to get users list");
      });
  },
  methods: {
    addKey() {
      const { validate } = useForm(this.key, this.rules);
      validate()
        .then(() => {
          return this.$axios.post(
            "/server/" + this.$route.params.serverid + "/sshKey",
            {
              ...this.key,
            },
            {
              Headers: {
                "Content-Type": "application/json",
              },
            }
          );
        })
        .then((res) => {
          console.log("Will emit next");
          this.$emit("keys", res.data);
        })
        .catch((error) => {
          console.log(error)
          if (error.response) {
            let data = error.response.data; // => the response payload
            //   console.log(res);
            console.log(data);
            this.fieldErrors = {
              label: { status: undefined, message: undefined },
              user: { status: undefined, message: undefined },
              key: { status: undefined, message: undefined },
            };
            this.fieldErrors[data.error.field] = {
              status: "error",
              message: data.error.message,
            };
          } else {
            this.$toast.error("Failed to add SSH key");
          }
        });
    },
  },
};
</script>
