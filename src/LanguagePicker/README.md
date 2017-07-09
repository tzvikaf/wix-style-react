# LanguagePicker component

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| dataHook | string | - | - | Specifies a data-hook for tests |
| children | nodes | - | + | Specify the languages list to render |
| onSelect | func | - | - | Callback to call on language selection |
| theme | string | icon-greybackground | - | Theme of the icon's background |
| dropdownWidth | string | 100px | - | An optional custom width for the dropdown |
| dropdownOffsetLeft | string | -30px | - | Am optional horizontal offset to the dropdown |


# LanguagePicker.Option

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| languageKey | string | - | + | language key such as 'en' that suits the translation file name |
| children | string | - | + | The language name to display in the dropdown's options |
