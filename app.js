var rpio = require('rpio');
var constants = require("./constants");

var options = {
gpiomem: true,          /* Use /dev/gpiomem */
         mapping: 'physical',    /* Use the P1-P40 numbering scheme */
}
rpio.init(options);

var setupGPIO = function() {
    var pin = 12;           /* P12/GPIO18 */
    var range = 1024;       /* LEDs can quickly hit max brightness, so only use */
    var max = 128;          /*   the bottom 8th of a larger scale */
    var clockdiv = 8;       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
    var interval = 5;       /* setInterval timer, speed of pulses */
    var times = 5;          /* How many times to pulse before exiting */

    rpio.open(constants.PWM_pin, rpio.PWM);
    rpio.pwmSetClockDivider(constants.PWM_clockdiv);
    rpio.pwmSetRange(constants.PWM_pin, constants.PWM_range);

}
var runMotor = function() {
    var direction = 1;
    var data = 0;
    var pulse = setInterval(function() {
        rpio.pwmSetData(constants.PWN_pin, data);
        if (data === 0) {
            direction = 1;
            if (times-- === 0) {
                clearInterval(pulse);
                rpio.open(pin, rpio.INPUT);
                return;
            }
        } else if (data === max) {
            direction = -1;
        }
        data += direction;
    }, constants.PWM_interval, data, direction, constants.PWS_times);
}

setupGPIO();

setInterval(runMotor(), constants.FEEDING_TIME);


