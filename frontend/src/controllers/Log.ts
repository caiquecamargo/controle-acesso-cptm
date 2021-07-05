import { ref } from "vue";

export default class Log {
  message = ref("");
  onError = ref(false);
  onSuccess = ref(false);

  error(message: string) {
    this.onError.value = true;
    this.message.value = message;
  }

  success(message: string) {
    this.onSuccess.value = true;
    this.message.value = message;
  }

  info(message: string) {
    this.message.value = message;
  }

  exposeToTemplate() {
    return {
      message: this.message,
      onError: this.onError,
      onSuccess: this.onSuccess,
    };
  }
}
