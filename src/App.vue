<template>
  <div id="app">
    <overlay-scrollbars
      ref="osComponentRef"
      style="max-height: 460px; height: 460px"
      :options="osOptions"
    >
      <div class="m-message">
        <ul>
          <li v-for="item in messages" :key="item.text">
            <p class="time">
              <span>{{ item.date | time }}</span>
            </p>
            <div class="main" :class="{ self: item.self }">
              <!-- <a-icon
                class="avatar"
                type="user"
                :style="{ fontSize: '34px;' }"
              /> -->
              <div class="text">{{ item.text }}</div>
            </div>
          </li>
        </ul>
      </div>
    </overlay-scrollbars>
    <div class="m-text">
      <textarea
        placeholder="Ctrl + Enter Send"
        v-model="text"
        @keyup="inputing"
      ></textarea>
    </div>
    <div class="send-msg">
      <!-- <a-button type="primary" @click="sendMsg($refs.osComponentRef)"
        >Send</a-button
      > -->
      <button @click="sendMsg($refs.osComponentRef)">Send</button>
    </div>
  </div>
</template>

<script>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

export default {
  name: "App",
  components: {
    "overlay-scrollbars": OverlayScrollbarsComponent,
  },
  data() {
    return {
      messages: [
        {
          text: "Do you need help?",
          date: "2020-12-30 09:11:11",
        },
        {
          text: "Sessin end time: 00:05",
          date: "2020-12-30 09:11:11",
        },
      ],
      osOptions: {
        scrollbars: {
          autoHide: "move",
        },
        callbacks: {
          onContentSizeChanged: this.onContentSizeChanged,
        },
      },
      text: "",
    };
  },
  filters: {
    // datetime to hour:minutes
    time(date) {
      if (typeof date === "string") {
        date = new Date(date);
      }
      return date.getHours() + ":" + date.getMinutes();
    },
  },
  methods: {
    inputing(e) {
      if (e.ctrlKey && e.keyCode === 13 && this.text.length) {
        this.sendMsg();
      }
    },
    onContentSizeChanged(e) {
      console.log(this.$refs.osComponentRef.osInstance());
      this.$refs.osComponentRef.osInstance();
      // .scroll({ y: "100%" }, 250, "swing");
    },
    sendMsg(osComponentRef) {
      console.log(osComponentRef.osInstance());
      this.messages.push({
        text: this.text,
        date: new Date(),
        self: true,
      });
      this.text = "";
    },
  },
};
</script>

<style lang="less" scoped>
.m-message {
  height: 420px;
  padding: 10px 15px;

  li {
    margin-bottom: 15px;
  }

  .time {
    margin: 7px 0;
    text-align: center;

    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background-color: #dcdcdc;
    }
  }

  .avatar {
    float: left;
    margin: 10px 10px 0 0;
    border-radius: 3px;
  }

  .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: ~"calc(100% - 40px)";
    min-height: 30px;
    line-height: 2.5;
    font-size: 14px;
    text-align: left;
    word-break: break-all;
    background-color: #F4F4F4;
    border-radius: 4px;

    &:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
  }

  .self {
    text-align: right;

    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }

    .text {
      background-color: #b2e281;

      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}

.m-text {
  height: 100px;
  border-top: solid 1px #ddd;
  margin-top: 10px;

  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    resize: none;
  }
}

.send-msg {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>