#include "driver/gpio.h"
#include "SPIFFS.h"

#define STATE_LED GPIO_NUM_12
#define ON_LED    GPIO_NUM_13
#define RELAY     GPIO_NUM_14
#define ON_STATE  1
#define OFF_STATE 0

#ifndef IO_H
#define IO_H

class IO {
  public:
    static void init();
    static void testLed();
    static void set(int pin, bool state);
    static void blink(int pin, int time, int period);
};

#endif