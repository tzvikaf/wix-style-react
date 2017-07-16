# Animator Component

> Basically all the animations you need in one component

## Properties

# Props of Animator Component
| propName | propType | defaultValue | Valid Values | description |
|----------|----------|--------------|-------------|-----|
| timing | string | large | micro, small, medium, large | Sets the duration |
| opacity | boolean | - | - | Sets Opacity |
| scale | boolean | - | - | Sets Scale |
| translate | translate Object | - | -| The items te animate. examples: translate / translate="left" / translate={to: 'left', size: 50} / translate={to: 'left', size: {in: 50, out: 20}}|
| sequence | string | - | default, flip, reverse, reverse-flip | Set a delay between appearance of children. See Sequence table for more details|
| className | string | - | - | The class will be added as a **direct parent class** for all the children it will have|
| debug | string | - | enter, entering, leave, leaving | Emulates the real animation classes without the need to animate. Just leave your element visible and add these classes to debug different stages. enter: 'enter', entering: 'enter enter-active', leave: 'leave', leaving: 'leave leave-active' |

# Props of Children of Animator Component

| propName | propType | defaultValue | Valid Values | description |
|----------|----------|--------------|-------------|-----|
| childClassName | string | - | - | This class will be the child of the **Animator className props** and is designed for layout purposes such as adding 'flex-grow:1' and such. **DO NOT** put your main design here. use **className** instead for it |
| childStyle | string | - | - | Same as class, designed only to interact with the **className prop** you provided to the Animator Component|


# Translate Object

| propName | propType | defaultValue | Valid Values | description |
|----------|----------|--------------|-------------|-----|
| to | string | top | top, bottom, left, right | Sets the direction **TO APPEAR** |
| size | number or size Object | 100 | 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 | Sets the size of the translation in percentage |

# Size Object

| propName | propType | defaultValue | Valid Values | description |
|----------|----------|--------------|-------------|-----|
| in | number | 100 | 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 | Sets the size of the translation in percentage for **APPEAR** |
| out | number | 100 | 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 | Sets the size of the translation in percentage for **DISAPPEAR** |

# Sequence Table

| propName | Which Child Appears First | Which Child disappears first |
|----------|---------------------------|-------------------|
| Default | First Child | First Child |
| flip | First Child | Last Child |
| reverse | Last Child | Last Child |
| reverse-flip | Last Child | First Child |
