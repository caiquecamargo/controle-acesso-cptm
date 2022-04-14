#include "io/IO.h"

void IO::init() {
  gpio_pad_select_gpio(STATE_LED);
  gpio_pad_select_gpio(ON_LED);
  gpio_pad_select_gpio(RELAY);
  gpio_set_direction(STATE_LED, GPIO_MODE_OUTPUT);
  gpio_set_direction(ON_LED, GPIO_MODE_OUTPUT);
  gpio_set_direction(RELAY, GPIO_MODE_OUTPUT);
  IO::set(ON_LED, ON_STATE);
  testLed();
}

void IO::testLed() {
  for(int i = 0; i < 5; i++) {
    set(STATE_LED, ON_STATE);
    set(ON_LED, ON_STATE);
    vTaskDelay(500 / portTICK_PERIOD_MS);
    set(STATE_LED, OFF_STATE);
    set(ON_LED, OFF_STATE);
    vTaskDelay(500 / portTICK_PERIOD_MS);
  }
}

void IO::set(int pin, bool state) {
  switch (pin) {
    case STATE_LED:
      gpio_set_level(STATE_LED, state);
      break;
    case ON_LED:
      gpio_set_level(ON_LED, state);
      break;
    case RELAY:
      gpio_set_level(RELAY, state);
      break;  
    default:
      break;
  }
}

void IO::blink(int pin, int time, int period) {
  for (int i = 0; i < time; i++) {
    set(pin, ON_STATE);
    vTaskDelay(period / portTICK_PERIOD_MS);
    set(pin, OFF_STATE);
    vTaskDelay(period / portTICK_PERIOD_MS);
  }
}