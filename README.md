IT-Incubator, Counter

variant1:

settings section:
-max value
-start value
set

checks:
start value >= 0 (if not: Incorrect value (red text, red field), 'set' is disabled)
max value > start value (if not: Incorrect value (red text, both red fields), 'set' is disabled)
while editing settings text 'enter values and press "set"'
enter only numbers

variant 2:
counter page: inc, reset, set buttons
set => settings page => change settings (wth validation - only red field) => set =>counter page with new settings
