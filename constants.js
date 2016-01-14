function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("pin" , 12)           /* P12/GPIO18 */
define("range" , 1024)       /* LEDs can quickly hit max brightness, so only use */
define("max" , 128);          /*   the bottom 8th of a larger scale */
define("clockdiv" , 8);       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
define("interval" , 5);       /* setInterval timer, speed of pulses */
define("times" , 5);          /* How many times to pulse before exiting */
